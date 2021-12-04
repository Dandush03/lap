# frozen_string_literal: true

class CreateCurrencies < ActiveRecord::Migration[6.1]
  def change
    create_table :currencies, id: :uuid do |t|
      t.string :country
      t.string :name
      t.string :code, limit: 3, null: false
      t.string :symbol, limit: 3, null: false

      t.timestamps
    end
  end
end
