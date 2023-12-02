FactoryBot.define do
  factory :user do
    email {Faker::Internet.email}
    password {"12345678"}

    trait :admin do
      role {1}
    end

    trait :not_admin do
      role {0}
    end

    trait :with_avatar do
      avatar {Rack::Test::UploadedFile.new("#{Rails.root}/spec/fixtures/avatar_image.jpeg", 'image/jpeg')}
    end
  end
end
