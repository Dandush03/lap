# frozen_string_literal: true

class CreateExchanges < ActiveRecord::Migration[6.1]
  def change
    create_table :exchanges do |t|
      t.decimal :value, precision: 13, scale: 2

      t.references :base_currency, index: true, foraign_key: true
      t.references :secondary_currency, index: true, foraign_key: true

      t.references :admin, index: true, foraign_key: true
      t.references :company, index: true, foraign_key: true
      t.timestamps
    end
  end
end
