class ImagesController < ApplicationController
  skip_before_action :authenticate_request, only: [:show]

  #tạo ảnh
  #created by: ttanh (02/10/2023)
  def create
    image = Image.new(image_params)

    if image.save
      key = image.image.key
      image.url = "https://d2n33bp2yovvw9.cloudfront.net/#{key}"
      image.user_id = @current_user.id
      image.save
      render json: { image: image }, status: :ok
    else
      render json: { errors: image.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  private

  def image_params
    params.permit(:image)
  end
end
