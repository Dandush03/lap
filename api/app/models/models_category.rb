# frozen_string_literal: true

class ModelsCategory < ApplicationRecord
  has_many :roles_permitions, class_name: 'RolesPermition', foreign_key: 'models_category_id'

  validates_presence_of :name, on: :create
end
