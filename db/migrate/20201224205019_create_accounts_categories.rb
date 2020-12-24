# frozen_string_literal: true

class CreateAccountsCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :accounts_categories do |t|
      t.string :type
      t.string :name

      t.references :company, index: true, foraign_key: true

      t.timestamps
    end
  end
end
