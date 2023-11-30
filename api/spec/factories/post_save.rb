FactoryBot.define do
  factory :post_save do
    association :user
    association :post
  end
end
