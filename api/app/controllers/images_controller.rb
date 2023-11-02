class ImagesController < ApplicationController
  skip_before_action :authenticate_request, only: [:show]

  #tạo ảnh
  #created by: ttanh (02/10/2023)
  def create
    image = Image.new(image_params)

    if image.save
      key = image.image.key
      image.url = "https://d2n33bp2yovvw9.cloudfront.net//#{key}" if image.image.attached?
      image.user_id = @current_user.id
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

    for id in ids do
      image = Image.find_by_id(id)
      if image
        if image.user_id == @current_user.id
          image.image.purge
          image.destroy
        end
      end
    end

    render json: { message: "Thành công" }, status: :ok
  end
  private

  def image_params
    params.permit(:image)
  end
end
