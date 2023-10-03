class PostsController < ApplicationController
  skip_before_action :authenticate_request, only: [:show, :viewToday]

  def show
  end

  def create
    post = Post.new(create_post_params)
    post.sender_id = @current_user.id
    
    # check user_id có tồn tại không
    user = User.find_by_id(params[:user_id])
    if !user
      render json: { errors: "Không tìm thấy trang cá nhân của người dùng được đăng lên." }, status: :bad_request
      return
    end

    #link ảnh vào bài viết
    image_ids = params[:image_ids]

    for image_id in image_ids do
      image = Image.find_by_id(image_id)
      if image
        post.images << image
      end
    end

    if post.save
      render json: { post: post, images: post.images }, status: :ok
    else
      render json: { errors: post.errors.full_messages }, status: :bad_request
    end
  end

  def show
    #link ảnh vào bài viết
    id = params[:id]

    post = Post.find_by_id(id)

    if post
      render json: { post: post, images: post.images }, status: :ok
    else
      render json: { errors: "Không tìm thấy bài viết" }, status: :bad_request
    end
  end

  private
  
  def create_post_params
    params.permit(:image_ids, :content, :user_id)
  end
end
