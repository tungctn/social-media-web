class UsersController < ApplicationController
  skip_before_action :authenticate_request, only: [:register, :info_index]

  def register
    @user = User.new(user_params)
    if @user.save
      token = jwt_encode({user_id: @user.id})

      # tạo thông tin người dùng mặc định
      info_param = {
        user_id: @user.id
      }
      user_info = UserInfo.new(info_param)
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
      user = User.find_by_id(params[:id])

      if !user
        render json: { errors: "Không tìm thấy người dùng" }, status: :bad_request
        return
      end

      user_info = user.user_info
      render json: { user_info: user_info }, status: :ok
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
    render json: { user_info: user_info }, status: :ok
  end

  # cập nhật thông tin người dùng hiện tại
  # created by: ttanh (24/09/2023)
  def info_update
    # begin
      if @current_user.update(password_update)
      else
        render json: { errors: @current_user.errors.full_messages },
              status: :bad_request
        return
      end

      user_info = @current_user.user_info
      if user_info.update(user_info_params)
        render json: { message: "Thành công!" }, status: :ok
        user_info.avatar_url = user_info.avatar.url if user_info.avatar.attached?
        user_info.background_url = user_info.background.url if user_info.background.attached?
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

  # xóa background
  # created by: ttanh (26/09/2023)
  def info_delete_background
    begin
      user_info = @current_user.user_info

      if !user_info.background.attached?
        render json: { errors: "Người dùng chưa cài background" }, status: :bad_request
        return
      end

      user_info.background.purge
      user_info.background_url = nil
      user_info.save
      render json: { message: "Thành công!" }, status: :ok
      return
    rescue
    end
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
      :background, :join_date, :last_login,
      :address, :bio, :relationship_status)
  end

  def password_update
    params.permit(:password)
  end
end
