FactoryBot.define do
  factory :post do
    content {Faker::Lorem.paragraph_by_chars(number: 20)}
    user_id { association :user }

    trait :share_post do
      share_id { association :post }
    end

    trait :active do
      status { 1 }
    end

    trait :pending do
      status { 2 }
    end

    trait :report_content do
      type_report { 1 }
    end

    trait :with_images do
      transient do
        avatar_file { Rails.root.join("spec", "fixtures", "image.jpeg") }
      end

      after :build do |post, evaluator|
        file = evaluator.avatar_file

        post.avatar.attach(
          io: file.open,
          filename: file.basename.to_s,
        )
      end
    end
  end
end
