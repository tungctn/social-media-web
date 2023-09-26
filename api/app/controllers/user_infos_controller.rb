class UserInfosController < ApplicationController
  # lấy thông tin người dùng hiện tại
  # created by: ttanh (24/09/2023)
  def index
    begin
      user_info = @current_user.user_info
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
  def create
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
  def update
    begin
      if !@current_user.user_info
        render json: { errors: "Thông tin người dùng chưa tồn tại!" }, status: :bad_request
        return
      end
      
      user_info = @current_user.user_info
      if user_info.update(user_info_params)
        render json: { message: "Thành công!" }, status: :ok
      else
        render json: { errors: user_info.errors.full_messages },
              status: :bad_request
      end
    rescue
    end
  end

  # xóa avatar
  # created by: ttanh (26/09/2023)
  def delete_avatar
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
  def delete_background
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
  
  private
  def user_info_params
    params.permit(:first_name, :last_name, 
      :full_name, :email, :phone_number,
      :date_of_birth, :gender, :avatar,
      :background, :join_date, :last_login,
      :address, :bio, :relationship_status)
  end
end