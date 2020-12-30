# frozen_string_literal: true

class Article < ApplicationRecord
  has_one_attached :picture

  belongs_to :company, class_name: 'Company', foreign_key: 'company_id'
  belongs_to :articles_group, class_name: 'ArticlesGroup', foreign_key: 'articles_group_id'

  belongs_to :buy_account,  class_name: 'AccountsCategory', foreign_key: 'buy_account_id', optional: true
  belongs_to :sell_account, class_name: 'AccountsCategory', foreign_key: 'sell_account_id', optional: true
  belongs_to :inv_account,  class_name: 'AccountsCategory', foreign_key: 'inv_account_id', optional: true

  belongs_to :buy_account_tax, class_name: 'Tax', foreign_key: 'buy_account_tax_id', optional: true
  belongs_to :sell_account_tax, class_name: 'Tax', foreign_key: 'sell_account_tax_id', optional: true

  validates :sku,  presence: true, uniqueness: { scope: :company_id }
  validates :name, presence: true, uniqueness: { scope: :company_id }
  validates :upc,  uniqueness: { scope: :company_id }, length: { is: 15, message: :upc_length }, allow_nil: true

  validates :open_qty, presence: true, if: :inventory
  validates :inv_account, presence: true, if: :inventory

  validates :buy_price, presence: true, numericality: { greater_than: 0 }, if: :buy_item
  validates :buy_account, presence: true, if: :buy_item
  validates :buy_account_tax, presence: true, if: :buy_item

  validates :sell_price, presence: true, numericality: { greater_than: 0 }, if: :sell_item
  validates :sell_account, presence: true, if: :sell_item
  validates :sell_account_tax, presence: true, if: :sell_item

  validate :testing
  def testing
    puts 'test'
    puts 'test'
    puts 'test'
    puts sell_item
    puts sell_price
    puts errors.messages
    puts 'test'
    puts 'test'
    puts 'test'
  end
end
