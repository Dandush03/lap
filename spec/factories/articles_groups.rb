FactoryBot.define do
  factory :articles_group do
    name { Faker::Name.unique.name  }
  end
end