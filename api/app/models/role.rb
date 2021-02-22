# frozen_string_literal: true

class Role < ApplicationRecord
  belongs_to :company, class_name: 'Company', foreign_key: 'company_id'

  has_many :admins, class_name: 'Admin', foreign_key: 'role_id'
  has_many :roles_permitions, class_name: 'RolesPermition', foreign_key: 'role_id'

  validates_presence_of :name, on: :create
end
