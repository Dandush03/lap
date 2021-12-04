# frozen_string_literal: true

FactoryBot.define do
  factory :roles_permition do
    association :model_id, factory: :model
    association :models_category_id, factory: :models_category

    association :role_id, factory: :role
  end
end
