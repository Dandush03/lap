# frozen_string_literal: true

class CreateTaxes < ActiveRecord::Migration[6.0]
  def change
    create_table :taxes do |t|
      t.string :name
      t.decimal :value, precision: 10, scale: 2

      t.references :company, index: true, foraign_key: true

      t.timestamps
    end
  end
end
