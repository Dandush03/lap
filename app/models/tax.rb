# frozen_string_literal: true

class Tax < ApplicationRecord
  belongs_to :company, class_name: 'Company', foreign_key: 'company_id'

  has_many :buy_articles, class_name: 'Article', foreign_key: 'buy_account_tax_id'
  has_many :sell_articles, class_name: 'Article', foreign_key: 'sell_account_tax_id'

  validates :name, presence: true, uniqueness: { scope: :company_id }
  validates :value, presence: true, numericality: { greater_than: 0 }
end
