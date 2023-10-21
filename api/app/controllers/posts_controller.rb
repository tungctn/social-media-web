class PostsController < ApplicationController
  skip_before_action :authenticate_request, only: [:get_all, :show, :view_today]

  def create
    post = Post.new(create_post_params)
    post.sender_id = @current_user.id
    
    if !get_user_by_id(params[:user_id])
      return
    end

    #link ảnh vào bài viết
    image_add(post, params[:image_ids])

    if post.save
      render json: { post: post, images: post.images }, status: :ok
    else
      render json: { errors: post.errors.full_messages }, status: :bad_request
    end
  end

  def show
    get_current_user() # gán current_user nếu có token truyền lên

    post = get_post_by_id(params[:id])
    
    if !post
      return
    end

    post_data = image_get([post])[0]
    
    post_data["type_react"] = nil
    post_data["comments"] = image_get(post.post_comments)

    post_data["comments"].each do |comment|
      user_info = UserInfo.select(:full_name, :avatar_url, :id).find_by(user_id: comment["user_id"])
      comment["user"] = user_info
    end

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

    render json: { post: post_data }, status: :ok
  end

  def get_all
    get_current_user() # gán current_user nếu có token truyền lên

    posts = nil

    if !params[:page_index] || !params[:page_size] || params[:page_index].empty? || params[:page_size].empty?
      posts = Post.all.order("created_at desc")
    else
      skip = params[:page_size].to_i * (params[:page_index].to_i - 1)
      posts = Post.limit(params[:page_size].to_i).offset(skip).order("created_at desc")
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

    render json: { posts: posts_data }, status: :ok
  end

  def update
    post = get_post_by_id(params[:id])

    if !post
      return
    end

    if !check_permisson_update_delete(post.sender_id)
      return
    end

    #link ảnh vào bài viết
    #xóa liên kết với ảnh cũ để tạo lại hết
    post.images.destroy_all
    image_add(post, params[:image_ids])

    if post.update(update_post_params)
      render json: { message: "Thành công" }, status: :ok
    else
      render json: { errors: post.errors.full_messages }, status: :bad_request
    end
  end

  def delete  
    post = get_post_by_id(params[:id])

    if !post
      return
    end

    if !check_permisson_update_delete(post.sender_id)
      return
    end

    # xóa ảnh
    image_delete(post)

    if post.destroy
      render json: { message: "thành công" }, status: :ok
    else
      render json: { errors: "lỗi" }, status: :bad_request
    end
  end

  #comment
  def create_comment
    post = get_post_by_id(params[:post_id])

    if !post
      return
    end

    comment = PostComment.new(create_comment_params)
    comment.user_id = @current_user.id

    #link ảnh vào comment
    image_add(comment, params[:image_ids])

    if comment.save
      post.comments_count = post.comments_count + 1
      post.save
      render json: { comment: comment, images: comment.images }, status: :ok
    else
      render json: { errors: comment.errors.full_messages }, status: :bad_request
    end
  end

  def update_comment
    comment = get_comment_by_id(params[:id])

    if !comment
      return
    end

    if !check_permisson_update_delete(comment.user_id)
      return
    end

    #link ảnh vào bài viết
    #xóa liên kết với ảnh cũ để tạo lại hết
    comment.images.destroy_all
    image_add(comment, params[:image_ids])

    if comment.update(update_comment_params)
      render json: { comment: comment, images: comment.images }, status: :ok
    else
      render json: { errors: comment.errors.full_messages }, status: :bad_request
    end
  end

  def delete_comment
    comment = get_comment_by_id(params[:id])

    if !comment
      return
    end

    post = get_post_by_id(comment.post_id)

    if !post
      return
    end

    if !check_permisson_update_delete(comment.user_id)
      return
    end

    # xóa ảnh
    image_delete(comment)

    if comment.destroy
      post.comments_count = post.comments_count - 1
      post.save
      render json: { message: "thành công" }, status: :ok
    else
      render json: { errors: "lỗi" }, status: :bad_request
    end
  end

  # biểu cảm với bài viết
  def react_post
    react = get_react_by_type(params[:type_react])
    
    if !react
      return
    end
    
    post = get_post_by_id(params[:post_id])

    if !post
      return
    end

    # tìm kiếm xem người dùng đã tương tác gì với bài viết này chưa
    react_post = post.reacts_post.find_by(user_id: @current_user.id)

    if !react_post
      post_react = ReactsPost.new(post: post, react: react, user: @current_user)
      post_react.save
    else
      react_post.update(react: react)
    end
    
    render json: { message: "Biểu cảm thành công" }, status: :ok
    return
  end

  # bỏ biểu cảm với bài viết
  def unreact_post
    post = get_post_by_id(params[:post_id])

    if !post
      return
    end

    # tìm kiếm xem người dùng đã tương tác gì với bài viết này chưa
    react_post = post.reacts_post.find_by(user_id: @current_user.id)

    if react_post
      react_post.destroy
      render json: { message: "Thành công" }, status: :ok
    else
      render json: { errors: "Người dùng chưa tương tác với bài viết." }, status: :ok
    end
  end

  private
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
  
  def create_post_params
    params.permit(:image_ids, :content, :user_id)
  end

  def update_post_params
    params.permit(:image_ids, :content)
  end

  def create_comment_params
    params.permit(:image_ids, :content, :post_id)
  end

  def update_comment_params
    params.permit(:image_ids, :content)
  end
end
