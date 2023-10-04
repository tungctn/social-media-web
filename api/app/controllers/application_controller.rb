class ApplicationController < ActionController::Base
  include JsonWebToken
  skip_before_action :verify_authenticity_token
  before_action :authenticate_request

  protected

  # lấy user bằng id
  # ttanh - 04/10/2023
  def get_user_by_id(id)
    user = User.find_by_id(id)
    if !user
      render json: { errors: "Không tìm thấy người dùng với id: #{id}" }, status: :bad_request
      return false
    end
    return user
  end

  # check quyền sửa, xóa với người dùng hiện tại
  # param <id>: id cần kiểm tra xem có trùng không
  # ttanh - 04/10/2023
  def check_permisson_update_delete(id)
    if @current_user.id != id
      render json: { errors: "Không có quyền." }, status: :forbidden
      return false
    end
    return true
  end

  # gán ảnh bằng id của ảnh cho các model có quan hệ với bảng images là n-n
  # param: <model> - model muốn gán
  #        <image_ids> - id của các ảnh
  # ttanh - 04/10/2023
  def image_add(model, image_ids)
    for image_id in image_ids do
      image = Image.find_by_id(image_id)
      if image
        model.images << image
      end
    end
  end

  # xóa model và xóa ảnh
  # param: <model> - model muốn xóa
  # ttanh - 04/10/2023
  def image_delete(model)
    for image in model.images do
      image.image.purge
      image.destroy
    end
  end

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
