class UserInfosController < ApplicationController
  skip_before_action :authenticate_request, only: [:show]

  #region Thông tin người dùng

  #lấy thông tin người dùng qua token
  #created by: ttanh (02/10/2023)
  def index
    user = @current_user

    if !user
      render json: { errors: "Không tìm thấy người dùng" }, status: :bad_request
      return
    end

    user_info = user.user_info

    render json: { user_info: user_info, email: user.email, user_id: user.id, role: user.role }, status: :ok
  end

  # lấy thông tin người dùng bất kì
  # created by: ttanh (24/09/2023)
  def show
    user = get_user_by_id(params[:id])

    if !user
      return
    end

    user_info = user.user_info

    render json: { user_info: user_info, email: user.email, user_id: user.id }, status: :ok
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

  # cập nhật password
  # ttanh (11/10/2023)
  def update_password
    if !@current_user&.authenticate(params[:old_password])
      render json: { errors: "Mật khẩu cũ chưa đúng." },
            status: :bad_request
      return
    end

    if @current_user.update(password_update)
      render json: { message: "Thành công!" },
            status: :ok
    else
      render json: { errors: @current_user.errors.full_messages },
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

  def password_update
    params.permit(:password)
  end
end