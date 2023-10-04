class PostsController < ApplicationController
  skip_before_action :authenticate_request, only: [:show, :viewToday]

  def create
    post = Post.new(create_post_params)
    post.sender_id = @current_user.id
    
    if !get_user_by_id(params[:user_id])
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

    post = get_post_by_id(id)
    
    if !post
      return
    end

    render json: { post: post, images: post.images }, status: :ok
  end

  def update
    id = params[:id]
    
    post = get_post_by_id(id)

    if !post
      return
    end

    if !check_permisson_update_delete(post.sender_id)
      return
    end

    #link ảnh vào bài viết
    #xóa hết ảnh cũ
    post.images.destroy_all
    
    image_ids = params[:image_ids]
    
    for image_id in image_ids do
      image = Image.find_by_id(image_id)
      if image
        post.images << image
      end
    end

    if post.update(update_post_params)
      render json: { post: post, images: post.images }, status: :ok
    else
      render json: { errors: post.errors.full_messages }, status: :bad_request
    end
  end

  def delete  
    id = params[:id]
    
    post = get_post_by_id(id)

    if !post
      return
    end

    if !check_permisson_update_delete(post.sender_id)
      return
    end

    #xóa hết ảnh cũ
    for image in post.images do
      image.image.purge
      image.destroy
    end

    if post.destroy
      render json: { message: "thành công" }, status: :ok
    else
      render json: { errors: "lỗi" }, status: :bad_request
    end
  end

  private
  
  def create_post_params
    params.permit(:image_ids, :content, :user_id)
  end

  def update_post_params
    params.permit(:image_ids, :content)
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
end
