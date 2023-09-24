class UserInfosController < ApplicationController
  # lấy thông tin người dùng hiện tại
  # created by: ttanh (24/09/2023)
  def index
    begin
      render json: { user_info: @current_user.user_info }, status: :ok
    rescue
    end
  end

  # thêm thông tin người dùng hiện tại
  # created by: ttanh (24/09/2023)
  def create
    begin
      if @current_user.user_info 
        render json: { errors: "Thông tin người dùng đã tồn tại!" }, status: :bad_request
      end

      combined_params = user_info_params.merge({
        user_id: @current_user.id
      })
      
      user_info = UserInfo.new(combined_params)
      if user_info.save
        render json: { user_info: user_info }, status: :ok
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
      end
      
      user_info = @current_user.user_info
      if user_info.update(user_info_params)
        render json: { user_info: user_info }, status: :ok
      else
        render json: { errors: user_info.errors.full_messages },
              status: :bad_request
      end
    rescue
    end
  end
  
  private
  def user_info_params
    params.permit(:first_name, :last_name, 
      :full_name, :email, :phone_number,
      :date_of_birth, :gender, :avatar_url,
      :background_url, :join_date, :last_login,
      :address, :bio, :relationship_status)
  end
end