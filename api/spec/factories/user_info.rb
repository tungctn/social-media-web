FactoryBot.define do
  factory :user_info do
    first_name {Faker::Name.name}
    last_name {Faker::Name.name}
    full_name {Faker::Name.name}
    association :user

    trait :with_avatar do
      transient do
        avatar_file { Rails.root.join("spec", "fixtures", "avatar_image.jpeg") }
      end

      after :build do |user_info, evaluator|
        file = evaluator.avatar_file

        user_info.avatar.attach(
          io: file.open,
          filename: file.basename.to_s,
        )
      end
    end
  end
end
