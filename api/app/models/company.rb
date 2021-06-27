# frozen_string_literal: true

class Company < ApplicationRecord
  belongs_to :base_currency, class_name: 'Currency', foreign_key: 'base_currency_id'
  belongs_to :secondary_currency, class_name: 'Currency', foreign_key: 'secondary_currency_id', optional: true

  has_one_attached :logo

  has_many :admins, class_name: 'Admin', foreign_key: 'company_id',  dependent: :destroy
  has_many :users, class_name: 'User', foreign_key: 'company_id',  dependent: :destroy
  has_many :articles, class_name: 'Article', foreign_key: 'company_id', dependent: :destroy
  has_many :accounting_accounts, class_name: 'AccountingAccount', foreign_key: 'company_id', dependent: :destroy
  has_many :articles_groups, class_name: 'ArticlesGroup', foreign_key: 'company_id', dependent: :destroy
  has_many :taxes, class_name: 'Tax', foreign_key: 'company_id', dependent: :destroy
  has_many :exchanges, class_name: 'Exchange', foreign_key: 'company_id', dependent: :destroy

  validates :name, presence: true, uniqueness: true
  validates :identification, presence: true, uniqueness: true
end
