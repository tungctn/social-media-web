class ApplicationController < ActionController::Base
  include JsonWebToken
  skip_before_action :verify_authenticity_token
  before_action :authenticate_request

  private

  def authenticate_request
    token = request.headers["Authorization"]
    token = token.split(" ").last if token
    decoded = jwt_decode token
    @current_user = User.find(decoded[:user_id])
  end
end
