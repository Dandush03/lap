# frozen_string_literal: true

FactoryBot.define do
  factory :accounting_account do
    name { Faker::Name.unique.name  }
    subcategory { Faker::Lorem.word }

    trait :inv do
      category { 'inv' }
    end

    trait :out do
      category { 'out' }
    end

    trait :in do
      category { 'in' }
    end
  end
end
