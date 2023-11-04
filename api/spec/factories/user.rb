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
  end
end
