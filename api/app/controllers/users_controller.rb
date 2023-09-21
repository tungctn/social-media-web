class UsersController < ApplicationController
  skip_before_action :authenticate_request, only: [:create]

  def create
    @user = User.new(user_params)
    if @user.save
      token = jwt_encode({user_id: @user.id})
      render json: { user: @user, token: token }, status: :created
    else
      render json: { errors: @user.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation)
  end
end
