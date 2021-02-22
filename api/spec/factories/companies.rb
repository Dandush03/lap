# frozen_string_literal: true

FactoryBot.define do
  factory :company do
    name { Faker::Name.unique.name  }
    sequence(:identification) { |n| "ID-#{n}" }
    base_currency factory: :currency
    secondary_currency factory: :currency
  end
end
