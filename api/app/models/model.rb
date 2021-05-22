# frozen_string_literal: true

class Model < ApplicationRecord
  has_many :roles_permitions, class_name: 'RolesPermition', foreign_key: 'model_id'

  validates_presence_of :name, on: :create
end
