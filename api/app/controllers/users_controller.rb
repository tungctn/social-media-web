class UsersController < ApplicationController
  skip_before_action :authenticate_request, only: [:register, :info_index]

  def register
    @user = User.new(user_params)
    if @user.save
      token = jwt_encode({user_id: @user.id})
      render json: { user: @user, token: token }, status: :created
    else
      render json: { errors: @user.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  #region Thông tin người dùng

  # lấy thông tin người dùng bất kì
  # created by: ttanh (24/09/2023)
  def info_index
    begin
      user = User.find_by_id(params[:id])

      if !user
        render json: { errors: "Không tìm thấy người dùng" }, status: :bad_request
        return
      end

      user_info = user.user_info

      if !user_info
        render json: { errors: "Thông tin người dùng chưa tồn tại" }, status: :bad_request
        return
      end

      avatar_url = user_info.avatar.url if user_info.avatar.attached?
      background_url = user_info.background.url if user_info.background.attached?

      user_info_merge = user_info.as_json
      user_info_merge["avatar_url"] = avatar_url
      user_info_merge["background_url"] = background_url
      
      render json: { user_info: user_info_merge }, status: :ok
    rescue
    end
  end

  # thêm thông tin người dùng hiện tại
  # created by: ttanh (24/09/2023)
  def info_create
    begin
      if @current_user.user_info 
        render json: { errors: "Thông tin người dùng đã tồn tại!" }, status: :bad_request
        return
      end

      combined_params = user_info_params.merge({
        user_id: @current_user.id
      })
      
      user_info = UserInfo.new(combined_params)
      if user_info.save
        render json: { message: "Thành công!" }, status: :ok
      else
        render json: { errors: user_info.errors.full_messages },
              status: :bad_request
      end
    rescue
    end
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

      if !@current_user.user_info
        render json: { message: "Cập nhật mật khẩu thành công, nhưng người dùng chưa có thông tin!" }, status: :ok
        return
      end

      user_info = @current_user.user_info
      if user_info.update(user_info_params)
        render json: { message: "Thành công!" }, status: :ok
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
    begin
      user_info = @current_user.user_info

      if !user_info
        render json: { errors: "Thông tin người dùng chưa tồn tại!" }, status: :bad_request
        return
      end

      if !user_info.avatar.attached?
        render json: { errors: "Người dùng chưa cài avatar" }, status: :bad_request
        return
      end

      user_info.avatar.purge
      render json: { message: "Thành công!" }, status: :ok
      return
    rescue
    end
  end

  # xóa background
  # created by: ttanh (26/09/2023)
  def info_delete_background
    begin
      user_info = @current_user.user_info

      if !user_info
        render json: { errors: "Thông tin người dùng chưa tồn tại!" }, status: :bad_request
        return
      end

      if !user_info.background.attached?
        render json: { errors: "Người dùng chưa cài background" }, status: :bad_request
        return
      end

      user_info.background.purge
      render json: { message: "Thành công!" }, status: :ok
      return
    rescue
    end
  end

  #endregion

  private

  def user_params
    params.permit(:email, :password, :password_confirmation)
  end

  def user_info_params
    params.permit(:first_name, :last_name, 
      :full_name, :email, :phone_number,
      :date_of_birth, :gender, :avatar,
      :background, :join_date, :last_login,
      :address, :bio, :relationship_status)
  end

  def password_update
    params.permit(:password, :password_confirmation)
  end
end
