FactoryBot.define do
  factory :friend do
    sender_id { association :user }
    receiver_id { association :user }

    trait :pending do
      friend_status {1}
    end

    trait :accept do
      friend_status {2}
    end
  end
end
