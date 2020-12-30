# frozen_string_literal: true

class AccountsCategory < ApplicationRecord
  belongs_to :company, class_name: 'Company', foreign_key: 'company_id'
  has_many :articles, class_name: 'Article', foreign_key: 'articles_group_id'
  
  validates :name, presence: true, uniqueness: { scope: :company_id }
  validates :subcategory, presence: true

  validates :category, presence: true, format: {with: /\A(inv|in|out)\z/}

  scope :buy_accounts,  -> { where(category: 'out') }
  scope :sell_accounts, -> { where(category: 'in') }
  scope :inv_accounts,  -> { where(category: 'inv') }
end
