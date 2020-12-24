# frozen_string_literal: true

class Company < ApplicationRecord
  has_many :users, class_name: 'User', foreign_key: 'company_id'
  has_many :articles, class_name: 'Article', foreign_key: 'company_id'
  has_many :accounts_categories, class_name: 'AccountsCategory', foreign_key: 'company_id'
end
