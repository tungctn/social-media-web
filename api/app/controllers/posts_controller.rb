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
    post = get_post_by_id(params[:id])
    
    if !post
      return
    end

    comments = image_get(post.post_comments)

    render json: { post: post, images: post.images, comments: comments }, status: :ok
  end

  def get_all
    posts = Post.all

    posts_with_images = image_get(posts)

    render json: { posts: posts_with_images }, status: :ok
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
      render json: { post: post, images: post.images }, status: :ok
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
    if !get_post_by_id(params[:post_id])
      return
    end

    comment = PostComment.new(create_comment_params)
    comment.user_id = @current_user.id

    #link ảnh vào comment
    image_add(comment, params[:image_ids])

    if comment.save
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

    if !check_permisson_update_delete(comment.user_id)
      return
    end

    # xóa ảnh
    image_delete(comment)

    if comment.destroy
      render json: { message: "thành công" }, status: :ok
    else
      render json: { errors: "lỗi" }, status: :bad_request
    end
  end

  # biểu cảm với bài viết
  def react_post
    react = React.where(["type_react = :t", { t: params[:type_react] }]).first
    
    if react == nil
      render json: { errors: "Truyền sai react type" }, status: :bad_request
      return
    end
    
    post = get_post_by_id(params[:post_id])

    if !post
      return
    end

    # tìm kiếm xem người dùng đã tương tác gì với bài viết này chưa
    react_post = post.reacts.where({ user_id: @current_user.id }).first
    render json: { message: react_post }, status: :ok
    return

    # if react_post
    #   react_post.react_id = react.id
    #   if react_post.save
    #     render json: { message: "Thành công" }, status: :ok
    #     return
    #   else
    #     render json: { errors: react_post.errors.full_messages }, status: :bad_request
    #     return
    #   end
    # end
    
     

    # if react_post.save
    #   render json: { message: "Thành công" }, status: :ok
    #   return
    # else
    #   render json: { errors: react_post.errors.full_messages }, status: :bad_request
    #   return
    # end
  end

  # bỏ biểu cảm với bài viết
  def unreact_post
  end

  private
  
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
