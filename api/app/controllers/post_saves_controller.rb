class PostSavesController < ApplicationController
  def index
    post_saves = nil

    if !params[:page_index] || !params[:page_size]
      post_saves = PostSave.where("user_id = ?", @current_user.id).order("created_at desc")
    else
      skip = params[:page_size].to_i * (params[:page_index].to_i - 1)
      post_saves = PostSave.where("user_id = ?", @current_user.id).limit(params[:page_size].to_i).offset(skip).order("created_at desc")
    end

    posts_data = []

    post_saves.each_with_index do |post_save, index|
      posts_data.push(get_post_data_by_id(post_save.post_id))
    end

    render json: { posts: posts_data }, status: :ok
  end

  def check_save
    post = get_post_by_id(params[:id])

    if !post
      return
    end

    render json: { is_save_post: !!get_post_save_by_post_id(params[:id]) }, status: :ok
  end

  def create
    post = get_post_by_id(params[:id])

    if !post
      return
    end

    is_save_post = get_post_save_by_post_id(post.id)

    if is_save_post
      render json: { message: "Đã lưu bài viết này" }, status: :ok
      return
    end

    post_save = PostSave.new()
    post_save.post_id = post.id
    post_save.user_id = @current_user.id
    post_save.save

    render json: { message: "Lưu bài viết thành công" }, status: :ok
  end

  def destroy
    post_save = get_post_save_by_post_id(params[:id])
    if !post_save
      render json: { message: "Chưa lưu bài viết này" }, status: :bad_request
      return
    end

    if post_save.destroy
      render json: { message: "Hủy lưu bài viết thành công" }, status: :ok
    else
      render json: { errors: "Lỗi" }, status: :bad_request
    end
  end

  private
  def get_post_save_by_post_id(post_id)
    post_save = PostSave.where("post_id = ? AND user_id = ?", post_id, @current_user.id).first

    if !post_save
      return nil
    end

    return post_save
  end
end
