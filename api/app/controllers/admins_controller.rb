require_relative "../enum/enum.rb"

class AdminsController < ApplicationController
  before_action :check_is_admin

  def get_post_report
    posts = nil

    if !params[:page_index] || !params[:page_size]
      posts = Post.where.not(status: [Enums::ACTIVE_STATUS[:active], nil]).order(status: :asc, updated_at: :desc, created_at: :desc)
    else
      skip = params[:page_size].to_i * (params[:page_index].to_i - 1)
      posts = Post.where.not(status: [Enums::ACTIVE_STATUS[:active], nil]).limit(params[:page_size].to_i).offset(skip).order(status: :asc, updated_at: :desc, created_at: :desc)
    end

    posts_data = []

    posts.each_with_index do |post, index|
      post_data = get_post_data_by_id(post.id)

      if post_data["share_id"]
        post_data["share_post"] = get_post_data_by_id(post_data["share_id"])
      else
        post_data["share_post"] = nil
      end

      posts_data.push(post_data)
    end

    render json: { posts: posts_data }, status: :ok
  end

  def get_comment_report
    comments = nil

    if !params[:page_index] || !params[:page_size]
      comments = PostComment.where.not(status: [Enums::ACTIVE_STATUS[:active], nil]).order(status: :asc, updated_at: :desc, created_at: :desc)
    else
      skip = params[:page_size].to_i * (params[:page_index].to_i - 1)
      comments = PostComment.where.not(status: [Enums::ACTIVE_STATUS[:active], nil]).limit(params[:page_size].to_i).offset(skip).order(status: :asc, updated_at: :desc, created_at: :desc)
    end

    comments_data = []

    comments.each_with_index do |comment, index|
      comment_data = get_comment_data_by_id(comment.id)
      comments_data.push(comment_data)
    end

    render json: { comments: comments_data }, status: :ok
  end

  def change_post_report
    post = get_post_by_id(params[:id])

    if !post
      return
    end

    post.update(update_report_params)
    render json: { message: "Thành công" }, status: :ok
  end

  def change_comment_report
    comment = get_comment_by_id(params[:id])

    if !comment
      return
    end

    comment.update(update_report_params)
    render json: { message: "Thành công" }, status: :ok
  end

  private
  def check_is_admin
    if @current_user.role != Enums::USER_ROLE[:admin]
      render json: { errors: "Chỉ quản trị viên mới có thể truy cập vào chức năng này." },
             status: :forbidden
    end
  end

  def update_report_params
    params.permit(:status, :error_list)
  end
end
