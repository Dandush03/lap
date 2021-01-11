class AccountingAccount < ApplicationRecord
  belongs_to :company, class_name: 'Company', foreign_key: 'company_id'
  has_many :buy_articles, class_name: 'Article', foreign_key: 'buy_account_id'
  has_many :sell_articles, class_name: 'Article', foreign_key: 'sell_account_id'
  has_many :inv_articles, class_name: 'Article', foreign_key: 'sell_account_id'

  validates :name, presence: true, uniqueness: { scope: :company_id }
  validates :subcategory, presence: true

  validates :category, presence: true, format: { with: /\A(inv|in|out)\z/ }

  scope :buy_accounts,  -> { where(category: 'out') }
  scope :sell_accounts, -> { where(category: 'in') }
  scope :inv_accounts,  -> { where(category: 'inv') }
end
