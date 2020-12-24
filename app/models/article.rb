# frozen_string_literal: true

class Article < ApplicationRecord
  belongs_to :company, class_name: 'Company', foreign_key: 'company_id'

  belongs_to :buy_account, class_name: 'AccountsCategory', foreign_key: 'buy_account_id'
  belongs_to :sell_account, class_name: 'AccountsCategory', foreign_key: 'sell_account_id'
  belongs_to :inv_account, class_name: 'AccountsCategory', foreign_key: 'inv_account_id', optional: true

  validates_uniqueness_of :sku
  validates_uniqueness_of :name

  validates_presence_of :open_qty, if: :inventory

  validates_presence_of :buy_price
  validates_presence_of :sell_price
end
