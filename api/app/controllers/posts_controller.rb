class PostsController < ApplicationController
  skip_before_action :authenticate_request, only: [:index, :show]

  def create
    post = Post.new(create_post_params)
    post.sender_id = @current_user.id

    if !get_user_by_id(params[:user_id])
      return
    end

    #chia sẻ bài viết
    share_id = params[:share_id]
    share_post = nil
    
    if share_id
      share_post = get_post_by_id(share_id)

      if share_post
        share_post.shares_count = share_post.shares_count + 1
        share_post.save

        if share_post.share_id
          post.share_id = share_post.share_id
        else
          post.share_id = share_id
        end

      else
        return;
      end
    else
      #link ảnh vào bài viết
      image_add(post, params[:image_ids])

      if (!validate_null_content_image(post))
        return
      end
    end

    if post.save
      render json: { post: post, images: post.images }, status: :ok
    else
      render json: { errors: post.errors.full_messages }, status: :bad_request
    end
  end

  def show
    get_current_user() # gán current_user nếu có token truyền lên

    post_data = get_post_data_by_id(params[:id])

    if !post_data
      return
    end

    if post_data["share_id"]
      post_data["share_post"] = get_post_data_by_id(post_data["share_id"])
    end

    render json: { post: post_data }, status: :ok
  end

  def index
    get_current_user() # gán current_user nếu có token truyền lên

    posts = nil

    if !params[:page_index] || !params[:page_size]
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

      if post_data["share_id"]
        post_data["share_post"] = get_post_data_by_id(post_data["share_id"])
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

    if params[:image_ids]
      #link ảnh vào bài viết
      #xóa liên kết với ảnh cũ để tạo lại hết
      post.images.destroy_all
      image_add(post, params[:image_ids])
    end

    if (!validate_null_content_image(post))
      return
    end

    if post.update(update_post_params)
      render json: { message: "Thành công" }, status: :ok
    else
      render json: { errors: post.errors.full_messages }, status: :bad_request
    end
  end

  def destroy
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
  
  private
  def create_post_params
    params.permit(:image_ids, :content, :user_id, :share_id)
  end

  def update_post_params
    params.permit(:content)
  end
end
