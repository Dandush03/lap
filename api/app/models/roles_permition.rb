# frozen_string_literal: true

class RolesPermition < ApplicationRecord
  belongs_to :role, class_name: 'Role', foreign_key: 'role_id'

  belongs_to :model, class_name: 'Model', foreign_key: 'model_id'
  belongs_to :models_category, class_name: 'ModelsCategory', foreign_key: 'models_category_id'
end
