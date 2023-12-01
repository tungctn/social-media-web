FactoryBot.define do
  factory :reacts_post do
    association :user
    association :post
    react_id {1}


    trait :like do
      type_react { 1 }
    end

    trait :love do
      type_react { 2 }
    end

    trait :react_not_found do
      type_react { -1 }
    end
  end
end
