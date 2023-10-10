class UsersController < ApplicationController
  skip_before_action :authenticate_request, only: [:register, :info_index]

  def register
    @user = User.new(user_params)
    if @user.save
      token = jwt_encode({user_id: @user.id})

      # tạo thông tin người dùng
      combined_params = user_info_params.merge({
        user_id: @user.id
      })
      user_info = UserInfo.new(combined_params)

      key = user_info.avatar.key if user_info.avatar.attached?
      user_info.avatar_url = "https://s3-ap-southeast-1.amazonaws.com/social-media-image/#{key}" if user_info.avatar.attached?
      user_info.save

      render json: { user: user_info, token: token }, status: :created
    else
      render json: { errors: @user.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  #region Thông tin người dùng

  # lấy thông tin người dùng bất kì
  # created by: ttanh (24/09/2023)
  def info_index
    # begin
      user = get_user_by_id(params[:id])

      if !user
        return
      end

      user_info = user.user_info

      render json: { user_info: user_info, email: user.email, user_id: user.id }, status: :ok
    # rescue
    # end
  end

  #lấy thông tin người dùng qua token
  #created by: ttanh (02/10/2023)
  def info_current_user
    user = @current_user

    if !user
      render json: { errors: "Không tìm thấy người dùng" }, status: :bad_request
      return
    end

    user_info = user.user_info

    render json: { user_info: user_info, email: user.email, user_id: user.id }, status: :ok
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

  # cập nhật thông tin người dùng hiện tại
  # created by: ttanh (24/09/2023)
  def info_update
    # begin
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
    # rescue
    # end
  end

  # xóa avatar
  # created by: ttanh (26/09/2023)
  def info_delete_avatar
    # begin
      user_info = @current_user.user_info

      if !user_info.avatar.attached?
        render json: { errors: "Người dùng chưa cài avatar" }, status: :bad_request
        return
      end

      user_info.avatar.purge
      user_info.avatar_url = nil
      user_info.save
      render json: { message: "Thành công!" }, status: :ok
      return
    # rescue
    # end
  end

  #endregion

  private

  def user_params
    params.permit(:email, :password)
  end

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
