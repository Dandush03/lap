# frozen_string_literal: true

FactoryBot.define do
  factory :tax do
    name { Faker::Name.unique.name }
    value { Faker::Number.decimal(l_digits: 1, r_digits: 2) }
  end
end
