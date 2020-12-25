# frozen_string_literal: true

class Article < ApplicationRecord
  has_one_attached :picture

  belongs_to :company, class_name: 'Company', foreign_key: 'company_id'
  belongs_to :articles_group, class_name: 'ArticlesGroup', foreign_key: 'articles_group_id'

  belongs_to :buy_account, class_name: 'AccountsCategory', foreign_key: 'buy_account_id'
  belongs_to :sell_account, class_name: 'AccountsCategory', foreign_key: 'sell_account_id'
  belongs_to :inv_account, class_name: 'AccountsCategory', foreign_key: 'inv_account_id', optional: true

  validates :sku, presence: true, uniqueness: { scope: :company_id }
  validates :name, presence: true, uniqueness: { scope: :company_id }

  validates_presence_of :open_qty, if: :inventory

  validates_presence_of :buy_price
  validates_presence_of :sell_price
end
