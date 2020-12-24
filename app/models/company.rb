class Company < ApplicationRecord
  has_many :users, class_name: "User", foreign_key: "company_id"
end
