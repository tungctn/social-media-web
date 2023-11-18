class SessionsController < ApplicationController
  skip_before_action :authenticate_request, only: [:ping]
  skip_after_action :update_last_time_active, only: [:end]

  def ping
    render json: { message: "Server đang hoạt động." }, status: :ok
  end

  def end
    if @current_user
      @current_user.last_time_active = nil
      @current_user.save
    end

    render json: { message: "Thành công." }, status: :ok
  end
end
