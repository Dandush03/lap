class Company < ApplicationRecord
  has_one_attached :logo

  has_many :users, class_name: 'User', foreign_key: 'company_id'
  has_many :articles, class_name: 'Article', foreign_key: 'company_id'
  has_many :accounting_accounts, class_name: 'AccountingAccount', foreign_key: 'company_id'
  has_many :articles_groups, class_name: 'ArticlesGroup', foreign_key: 'company_id'
  has_many :taxes, class_name: 'Tax', foreign_key: 'company_id'

  validates :name, presence: true, uniqueness: true
  validates :identification, presence: true, uniqueness: true
end