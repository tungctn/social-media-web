class SessionsController < ApplicationController
  skip_after_action :update_last_time_active, only: [:end]

  def ping
    time = {
      "1": Time.current,
      "2": Time.zone.now
    }

    render json: { message: "Server đang hoạt động.", server_time: time }, status: :ok
  end

  def end
    if @current_user
      @current_user.last_time_active = nil
      @current_user.save
    end

    render json: { message: "Thành công." }, status: :ok
  end
end
