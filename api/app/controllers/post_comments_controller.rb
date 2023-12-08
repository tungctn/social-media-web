require_relative "../enum/enum.rb"

class PostCommentsController < ApplicationController

  #lấy bình luận của một bài viết
  def show
    post = get_post_by_id(params[:post_id])

    if !post
      return
    end

    comments = post.post_comments.order("created_at asc")

    comments_data = image_get(comments)

    comments_data.each do |comment|
      user_info = UserInfo.select(:full_name, :avatar_url, :id).find_by(user_id: comment["user_id"])
      comment["user"] = user_info
    end

    comments.each_with_index do |comment, index|
      react_comment = comment.reacts_post_comment.find_by(user_id: @current_user.id)

      if !react_comment
        comments_data[index]["type_react"] = nil
      else
        react = React.find_by_id(react_comment.react_id)
        comments_data[index]["type_react"] = react.type_react
      end
    end

    comments_parent = []
    comments_data.each do |comment|
      if !comment["comment_reply"]
        comment["replies_comment"] = []
        comments_parent.push(comment)
      else
        comments_parent.each do |comment_parent|
          if comment_parent["id"].to_i == comment["comment_reply"].to_i
            comment_parent["replies_comment"].push(comment)
            break
          end
        end
      end
    end

    #sắp xếp theo thời gian comment mới nhất
    comments_parent_sort_by_desc_and_limit = comments_parent.reverse()

    if params[:page_index] || params[:page_size]
      skip = params[:page_size].to_i * (params[:page_index].to_i - 1)
      comments_parent_sort_by_desc_and_limit = comments_parent_sort_by_desc_and_limit[skip..(params[:page_size].to_i + skip - 1)]
    end

    render json: { comments: comments_parent_sort_by_desc_and_limit }, status: :ok
  end

  def create
    post = get_post_by_id(params[:post_id])

    if !post
      return
    end

    comment = PostComment.new(create_comment_params)
    comment.user_id = @current_user.id

    # phản hồi bình luận
    comment_reply = nil
    if params[:comment_reply]
      comment_reply = get_comment_by_id(params[:comment_reply])
    end

    if comment_reply
      #check xem bình luận đang focus vào đã phản hồi thằng nào chưa
      #chỉ lấy 1 cha
      if comment_reply.comment_reply
        comment.comment_reply = comment_reply.comment_reply
      else
        comment.comment_reply = params[:comment_reply]
      end
    end

    #link ảnh vào comment
    image_add(comment, params[:image_ids])

    if (!validate_null_content_image(comment))
      return
    end
    comment.save
    post.comments_count = post.comments_count + 1
    post.save
    render json: { comment: comment, images: comment.images }, status: :ok
  end

  def update
    comment = get_comment_by_id(params[:id])

    if !comment
      return
    end

    if !check_permisson_update_delete(comment.user_id)
      return
    end

    if params[:image_ids]
      #link ảnh vào bình luận
      #xóa liên kết với ảnh cũ để tạo lại hết
      comment.images.destroy_all
      image_add(comment, params[:image_ids])
    end

    if (!validate_null_content_image(comment))
      return
    end

    comment.update(update_comment_params)
    render json: { comment: comment, images: comment.images }, status: :ok
  end

  def destroy
    comment = get_comment_by_id(params[:id])

    if !comment
      return
    end

    post = get_post_by_id(comment.post_id)

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

  def report
    comment = get_comment_by_id(params[:id])

    if !comment
      return
    end

    comment.status = Enums::ACTIVE_STATUS[:pending]
    comment.type_report = params[:type_report]
    comment.time_report = Time.current

    comment.save
    render json: { message: "Báo cáo thành công" }, status: :ok
  end

  private
  def create_comment_params
    params.permit(:image_ids, :content, :post_id, :user_reply_name, :user_reply_id, :status, :label, :error_list, :status_positive)
  end

  def update_comment_params
    params.permit(:content, :user_reply_name, :user_reply_id, :status_positive)
  end
end
