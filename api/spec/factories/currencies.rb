# frozen_string_literal: true

FactoryBot.define do
  factory :currency do
    country { Faker::Address.country[0..40] }
    name { Faker::Currency.name[0..40] }
    symbol { Faker::Currency.symbol[0..2] }
    code { Faker::Currency.code[0..2] }
  end
end
