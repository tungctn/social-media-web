require_relative "../enum/enum.rb"

class UsersController < ApplicationController
  skip_before_action :authenticate_request, only: [:register]

  def register
    @current_user = User.new(user_params)
    @current_user.role = Enums::USER_ROLE[:user]
    if @current_user.save

      token = jwt_encode({user_id: @current_user.id})

      # tạo thông tin người dùng
      combined_params = user_info_params.merge({
        user_id: @current_user.id
      })
      user_info = UserInfo.new(combined_params)

      key = user_info.avatar.key if user_info.avatar.attached?
      user_info.avatar_url = "https://s3-ap-southeast-1.amazonaws.com/social-media-image/#{key}" if user_info.avatar.attached?
      user_info.save
      add_login_history()
      render json: { user: user_info, token: token }, status: :created
    else
      render json: { errors: @current_user.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  # cập nhật password
  # ttanh (11/10/2023)
  def update_password
    if !@current_user.authenticate(params[:old_password])
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
