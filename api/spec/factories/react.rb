FactoryBot.define do
  factory :react do
    trait :like do
      type_react { 1 }
    end

    trait :love do
      type_react { 2 }
    end
  end
end
