FactoryBot.define do
  factory :image do
    image {Rack::Test::UploadedFile.new("#{Rails.root}/spec/fixtures/avatar_image.jpeg", 'images/jpeg')}
  end
end
