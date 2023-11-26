require_relative "../enum/enum.rb"

class PostsController < ApplicationController
  skip_before_action :authenticate_request, only: [:index, :show, :show_user_post]

  def search
    get_current_user() # gán current_user nếu có token truyền lên

    atrs_search = ["content"]

    query_where = nil

    if params[:text_search].length == 0
      query_where = "status <> #{Enums::ACTIVE_STATUS[:ban]}"
    else
      query_where = build_where_text_search(atrs_search, params[:text_search]) + " AND " + "status <> #{Enums::ACTIVE_STATUS[:ban]}"
    end

    posts_data = get_list_post_data_by_where_query(query_where)

    render json: { data_search: posts_data }, status: :ok
  end

  def show_user_post
    get_current_user() # gán current_user nếu có token truyền lên

    user = get_user_by_id(params[:id])

    if !user
      return
    end

    posts_data = get_list_post_data_by_filter(user.id)

    render json: { posts: posts_data }, status: :ok
  end

  def my_post
    posts_data = get_list_post_data_by_filter(@current_user.id)

    render json: { posts: posts_data }, status: :ok
  end

  def newest_post
    newest_post = Post.where("status <> #{Enums::ACTIVE_STATUS[:ban]} AND user_id = #{@current_user.id}").order(created_at: :desc).first
    
    if newest_post
      newest_post_data = get_post_data_by_id(newest_post.id)
    else
      newest_post_data = nil
    end

    render json: { posts: newest_post_data }, status: :ok
  end

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
    else
        post_data["share_post"] = nil
    end

    render json: { post: post_data }, status: :ok
  end

  def index
    get_current_user() # gán current_user nếu có token truyền lên

    posts_data = get_list_post_data_by_filter(nil)

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

  def report
    post = get_post_by_id(params[:id])
    
    if !post
      return
    end

    post.status = Enums::ACTIVE_STATUS[:pending]
    post.type_report = params[:type_report]
    post.time_report = Time.current

    if post.save
      render json: { message: "Báo cáo thành công" }, status: :ok
    else
      render json: { errors: "Bị lỗi" }, status: :bad_request
    end
  end
  
  private
  def create_post_params
    params.permit(:image_ids, :content, :user_id, :share_id, :status, :label, :error_list)
  end

  def update_post_params
    params.permit(:content)
  end
end
