# frozen_string_literal: true

FactoryBot.define do
  factory :admin do
    company
    sequence(:username) { |n| "user#{n}" }
    firstname { Faker::Name.unique.name }
    lastname { Faker::Name.unique.name }
    email { Faker::Internet.email }
    password { '123123' }
    password_confirmation { '123123' }
  end
end
