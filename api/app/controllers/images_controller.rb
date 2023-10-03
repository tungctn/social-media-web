class ImagesController < ApplicationController
  #tạo ảnh
  #created by: ttanh (02/10/2023)
  def create
    image = Image.new(image_params)

    if image.save
      image.url = image.image.url if image.image.attached?
      image.save
      render json: { image: image }, status: :ok
    else
      render json: { errors: "Lỗi đường truyền vui lòng thử lại sau." }, status: :internal_server_error
    end
  end

  #lấy ảnh bằng id
  def show
    image = Image.find_by_id(params[:id])

    if image 
      render json: { image: image }, status: :ok
    else
      render json: { errors: "Không tìm thấy ảnh." }, status: :bad_request
    end
  end

  #xóa ảnh
  def deletes
    ids = params[:ids]

    if !ids
      render json: { message: "Thành công!" }, status: :ok
      return
    end
  end
  private

  def image_params
    params.permit(:image)
  end
end
