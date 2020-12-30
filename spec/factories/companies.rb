FactoryBot.define do
  factory :company do
    name { Faker::Name.unique.name  }
    sequence(:identification) { |n| "ID-#{n}" }
  end
end