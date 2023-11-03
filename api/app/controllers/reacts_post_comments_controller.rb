class ReactsPostCommentsController < ApplicationController
  # biểu cảm với bình luận
  def create
    react = get_react_by_type(params[:type_react])

    if !react
      return
    end

    comment = get_comment_by_id(params[:comment_id])

    if !comment
      return
    end

    # tìm kiếm xem người dùng đã tương tác gì với comment này chưa
    react_comment = comment.reacts_post_comment.find_by(user_id: @current_user.id)

    if !react_comment
      comment_react = ReactsPostComment.new(post_comment: comment, react: react, user: @current_user)
      comment_react.save
    else
      react_comment.update(react: react)
    end

    render json: { message: "Biểu cảm thành công" }, status: :ok
    return
  end

  # bỏ biểu cảm với bình luận
  def destroy
    comment = get_comment_by_id(params[:comment_id])

    if !comment
      return
    end

    # tìm kiếm xem người dùng đã tương tác gì với comment này chưa
    react_comment = comment.reacts_post_comment.find_by(user_id: @current_user.id)

    if react_comment
      react_comment.destroy
      render json: { message: "Thành công" }, status: :ok
    else
      render json: { errors: "Người dùng chưa tương tác với bài viết." }, status: :ok
    end
  end
end