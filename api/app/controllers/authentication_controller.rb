class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request

  def login
    @current_user = User.find_by_email(params[:email])
    if @current_user&.authenticate(params[:password])
      token = jwt_encode({user_id: @current_user.id})
      add_login_history()
      render json: { user: @current_user, token: token }, status: :ok
    else
      render json: { errors: "unauthorized" },
             status: :unauthorized
    end
  end
end
