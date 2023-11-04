class ReactsPostsController < ApplicationController
  # biểu cảm với bài viết
  def create
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
  def destroy
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
end