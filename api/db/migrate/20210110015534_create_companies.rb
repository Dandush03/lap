# frozen_string_literal: true

class CreateCompanies < ActiveRecord::Migration[6.1]
  def change
    create_table :companies do |t|
      t.string :name
      t.string :logo

      t.string :identification

      t.references :base_currency, index: true, foraign_key: true
      t.references :secondary_currency, index: true, foraign_key: true

      t.timestamps
    end

    add_index :companies, :name,            unique: true
    add_index :companies, :identification,  unique: true
  end
end
