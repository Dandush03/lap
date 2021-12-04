# frozen_string_literal: true

class Currency < ApplicationRecord
  validates :country, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: true
  validates :code, presence: true, uniqueness: true, length: { is: 3, message: :invalid_code }
  validates :symbol, presence: true, length: { minimum: 1, maximum: 3, message: :invalid_symbol }
end
