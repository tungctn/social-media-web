class ApplicationController < ActionController::Base
  include JsonWebToken
  skip_before_action :verify_authenticity_token
  before_action :authenticate_request
  after_action :update_last_time_active

  protected
  # thêm lịch sử đăng nhập
  def add_login_history
    if @current_user
      login_history = LoginHistory.new
      login_history.user_id = @current_user.id
      login_history.ip_address = request.remote_ip
      login_history.save
    end
  end

  # lấy user bằng id
  # ttanh - 04/10/2023
  def get_user_by_id(id)
    user = User.find_by_id(id)
    if !user
      render json: { errors: "Không tìm thấy người dùng với id: #{id}" }, status: :bad_request
      return false
    end
    return user
  end

  # check quyền sửa, xóa với người dùng hiện tại
  # param <id>: id cần kiểm tra xem có trùng không
  # ttanh - 04/10/2023
  def check_permisson_update_delete(id)
    if @current_user.id != id
      render json: { errors: "Không có quyền." }, status: :forbidden
      return false
    end
    return true
  end

  # gán ảnh bằng id của ảnh cho các model có quan hệ với bảng images là n-n
  # param: <model> - model muốn gán
  #        <image_ids> - id của các ảnh
  # ttanh - 04/10/2023
  def image_add(model, image_ids)
    if !image_ids
      return
    end

    image_ids.each do |image_id|
      image = Image.find_by_id(image_id)
      if image
        model.images << image
      end
    end
  end

  # xóa model và xóa ảnh
  # param: <model> - model muốn xóa
  # ttanh - 04/10/2023
  def image_delete(model)
    images = model.images
    
    images.each do |image|
      image.image.purge
      image.destroy
    end
  end

  # lấy model và ảnh
  # param: <models> - mảng model muốn lấy ảnh
  # ttanh - 04/10/2023
  def image_get(models)
    models_with_images = []

    for model in models do
      model_data = {}
      model_data_merge = model_data.merge(model.attributes)
      model_data_merge["images"] = []

      model.images.select(:id, :url).each do |image|
        model_data_merge["images"].push(image.attributes) # Kết hợp thuộc tính của mỗi đối tượng hình ảnh vào model_data
      end

      models_with_images.push(model_data_merge)
    end

    return models_with_images
  end

  
  # check react tồn tại
  # ttanh - 17/10/2023
  def get_react_by_type(type)
    react = React.where(["type_react = :t", { t: type }]).first

    if react == nil
      render json: { errors: "Truyền sai react type" }, status: :bad_request
      return false
    end

    return react
  end

  # check bài viết tồn tại
  # ttanh - 04/10/2023
  def get_post_by_id(id)
    post = Post.find_by_id(id)
    if !post
      render json: { errors: "Không tìm thấy bài viết với id: #{id}" }, status: :bad_request
      return false
    end
    return post
  end

  # Lấy dữ liệu chi tiết của 1 bài viết
  def get_post_data_by_id(id)
    post = get_post_by_id(id)

    if !post
      return false
    end

    post_data = image_get([post])[0]

    post_data["type_react"] = nil

    post_data["user"] = UserInfo.select(:full_name, :avatar_url, :id).find_by(user_id: post.user_id)

    if post.comments_count <= 0
      count_comment = post.post_comments.size
      post.comments_count = count_comment
      post.save
      post_data["comments_count"] = count_comment
    end

    if @current_user
      react_post = post.reacts_post.find_by(user_id: @current_user.id)

      if !react_post
      else
        react = React.find_by_id(react_post.react_id)
        post_data["type_react"] = react.type_react
      end
    end

    return post_data
  end

  # Lấy dữ liệu chi tiết của nhiều bài viết
  def get_list_post_data_by_filter(user_id)
    posts = nil

    if !params[:page_index] || !params[:page_size]
      if user_id
        posts = Post.where(["user_id = :user_id", { user_id: user_id }]).order("created_at desc")
      else
        posts = Post.all.order("created_at desc")
      end
    else
      skip = params[:page_size].to_i * (params[:page_index].to_i - 1)

      if user_id
        posts = Post.where(["user_id = :user_id", { user_id: user_id }]).limit(params[:page_size].to_i).offset(skip).order("created_at desc")
      else
        posts = Post.limit(params[:page_size].to_i).offset(skip).order("created_at desc")
      end
    end

    posts_data = image_get(posts)

    posts_data.each_with_index do |post_data, index|
      if posts[index].comments_count <= 0
        count_comment = posts[index].post_comments.size
        posts[index].comments_count = count_comment
        posts[index].save
        post_data["comments_count"] = count_comment
      end

      post_data["type_react"] = nil
      post_data["user"] = UserInfo.select(:full_name, :avatar_url, :id).find_by(user_id: posts[index].user_id)

      if post_data["share_id"]
        post_data["share_post"] = get_post_data_by_id(post_data["share_id"])
      else
        post_data["share_post"] = nil
      end

      #react
      if !@current_user
        next
      end

      react_post = posts[index].reacts_post.find_by(user_id: @current_user.id)

      if !react_post
      else
        react = React.find_by_id(react_post.react_id)
        post_data["type_react"] = react.type_react
      end
    end

    return posts_data
  end

  # check comment tồn tại
  # ttanh - 04/10/2023
  def get_comment_by_id(id)
    comment = PostComment.find_by_id(id)
    if !comment
      render json: { errors: "Không tìm thấy comment với id: #{id}" }, status: :bad_request
      return false
    end
    return comment
  end

  # Lấy dữ liệu chi tiết của 1 comment
  def get_comment_data_by_id(id)
    comment = get_comment_by_id(id)

    if !comment
      return false
    end

    comment_data = image_get([comment])[0]

    comment_data["type_react"] = nil

    comment_data["user"] = UserInfo.select(:full_name, :avatar_url, :id).find_by(user_id: comment.user_id)

    if @current_user
      react_comment = comment.reacts_post_comment.find_by(user_id: @current_user.id)

      if !react_comment
      else
        react = React.find_by_id(react_comment.react_id)
        comment_data["type_react"] = react.type_react
      end
    end

    return comment_data
  end

  # kiểm tra xem bài viết, bình luận có trống dữ liệu không
  def validate_null_content_image(model)
    if params[:content].strip == "" and model.images == []
      render json: { errors: "Nội dung không được để trống" }, status: :bad_request
      return false
    end

    if params[:content].strip == nil and model.images == []
      render json: { errors: "Nội dung không được để trống" }, status: :bad_request
      return false
    end

    return true
  end

  private
  
  # updated by - ttanh (23/09/23) Thêm xử lý cho việc người dùng không gửi token
  def authenticate_request
    token = request.headers["Authorization"]
    if token
      token = token.split(" ").last
      decoded = jwt_decode token
      @current_user = User.find(decoded[:user_id])
    else
      render json: { errors: "Bạn cần gửi token" },
             status: :unauthorized
    end
  end

  # lấy người dùng với những request không bắt buộc phải gửi
  def get_current_user
    token = request.headers["Authorization"]
    if token
      token = token.split(" ").last
      decoded = jwt_decode token
      @current_user = User.find_by_id(decoded[:user_id])
    end
  end

  def update_last_time_active
    if @current_user
      @current_user.last_time_active = Time.current
      @current_user.save
    end
  end
end
