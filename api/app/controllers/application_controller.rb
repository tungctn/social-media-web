class ApplicationController < ActionController::Base
  include JsonWebToken
  skip_before_action :verify_authenticity_token
  before_action :authenticate_request

  private
  
  # updated by - ttanh (23/09/23) Thêm xử lý cho việc người dùng không gửi token
  def authenticate_request
    token = request.headers["Authorization"]
    if token
      token = token.split(" ").last
      decoded = jwt_decode token
      @current_user = User.find(decoded[:user_id])
    else
      render json: { errors: "Bạn cần gửi token" },
             status: :unauthorized
    end
  end
end
