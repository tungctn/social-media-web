FactoryBot.define do
  factory :image do
    image {Rack::Test::UploadedFile.new("#{Rails.root}/spec/fixtures/image.jpeg", 'images/jpeg')}
  end
end
