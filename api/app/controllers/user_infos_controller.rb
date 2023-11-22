class UserInfosController < ApplicationController
  #region Thông tin người dùng

  #lấy thông tin người dùng qua token
  #created by: ttanh (02/10/2023)
  def index
    render json: { user_info: @current_user.user_info, email: @current_user.email, user_id: @current_user.id, role: @current_user.role }, status: :ok
  end

  # lấy thông tin người dùng bất kì
  # created by: ttanh (24/09/2023)
  def show
    user = get_user_by_id(params[:id])

    user_info = user.user_info

    friend = {
      friend_status: nil,
      is_sender: nil
    }

    friend_request = nil
    friend_request = Friend.find_by(receiver_id: @current_user.id, sender_id: user.id)

    if !friend_request
      friend_request = Friend.find_by(sender_id: @current_user.id, receiver_id: user.id)

      if friend_request
        friend["friend_status"] = friend_request.friend_status
        friend["is_sender"] = true
      end
    else
      friend["friend_status"] = friend_request.friend_status
      friend["is_sender"] = false
    end

    render json: { user_info: user_info, email: user.email, user_id: user.id, friend: friend }, status: :ok
  end

  # cập nhật thông tin người dùng hiện tại
  # created by: ttanh (24/09/2023)
  def update
    user_info = @current_user.user_info
    if user_info.update(user_info_params)
      render json: { message: "Thành công!" }, status: :ok
      key = user_info.avatar.key if user_info.avatar.attached?
      user_info.avatar_url = "https://s3-ap-southeast-1.amazonaws.com/social-media-image/#{key}" if user_info.avatar.attached?
      user_info.save
    else
      render json: { errors: user_info.errors.full_messages },
            status: :bad_request
    end
  end

  # xóa avatar
  # created by: ttanh (26/09/2023)
  def delete_avatar
    user_info = @current_user.user_info

    if !user_info.avatar.attached?
      render json: { errors: "Người dùng chưa cài avatar" }, status: :bad_request
      return
    end

    user_info.avatar.purge
    user_info.avatar_url = nil
    user_info.save
    render json: { message: "Thành công!" }, status: :ok
  end
  #endregion

  private
  def user_info_params
    params.permit(:first_name, :last_name,
      :full_name, :phone_number,
      :date_of_birth, :gender, :avatar,
      :join_date, :last_login, :bio,
      :address, :relationship_status)
  end
end
