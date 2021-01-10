FactoryBot.define do
  factory :user do
    sequence(:username) { |n| "user#{n}" }
    sequence(:name) { |n| "name#{n}" }
    sequence(:lastname) { |n| "lastname#{n}" }
    email { "#{username}@example.com".downcase }
    password { 'password' }
  end
end
