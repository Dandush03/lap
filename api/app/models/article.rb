# frozen_string_literal: true

class Article < ApplicationRecord
  has_one_attached :picture

  belongs_to :company, class_name: 'Company', foreign_key: 'company_id'
  belongs_to :articles_group, class_name: 'ArticlesGroup', foreign_key: 'articles_group_id'

  belongs_to :buy_account,  class_name: 'AccountingAccount', foreign_key: 'buy_account_id', optional: true
  belongs_to :sell_account, class_name: 'AccountingAccount', foreign_key: 'sell_account_id', optional: true
  belongs_to :inv_account,  class_name: 'AccountingAccount', foreign_key: 'inv_account_id', optional: true

  belongs_to :buy_account_tax, class_name: 'Tax', foreign_key: 'buy_account_tax_id', optional: true
  belongs_to :sell_account_tax, class_name: 'Tax', foreign_key: 'sell_account_tax_id', optional: true

  validates :sku,  presence: true, uniqueness: { scope: :company_id }
  validates :name, presence: true, uniqueness: { scope: :company_id }
  validates :upc,  uniqueness: { scope: :company_id }, length: { is: 15, message: :upc_length }, allow_blank: true

  validates :inv_account, presence: true, if: :inventory
  validates :open_qty, presence: true, if: :inventory
  validates :open_qty_value, presence: true, numericality: { greater_than: 0 }, if: :inventory

  validates :buy_price, presence: true, numericality: { greater_than: 0 }, if: :buy_item
  validates :buy_account, presence: true, if: :buy_item

  validates :sell_price, presence: true, numericality: { greater_than: 0 }, if: :sell_item
  validates :sell_account, presence: true, if: :sell_item

  def json_response
    except_columns = %i[updated_at created_at picture]
    response = as_json(except: except_columns)
    return response unless picture.attached?

    response.merge({ picture: rails_blob_path(picture, only_path: true) })
  end
end
