# User Model
class User < ApplicationRecord
  # encrypt password
  has_secure_password
  has_one_attached :profile

  belongs_to :company, class_name: 'Company', foreign_key: 'company_id'

  # Model associations
  has_many :tokens, dependent: :destroy

  # Validations
  validates :name, presence: true, length: { maximum: 50 }
  validates :lastname, presence: true, length: { maximum: 50 }
  validates :username, presence: true, uniqueness: true, length: { maximum: 30 }
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { maximum: 15, minimum: 6 }

  def is_admin?
    admin
  end
end
