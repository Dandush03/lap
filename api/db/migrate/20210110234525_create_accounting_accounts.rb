# frozen_string_literal: true

class CreateAccountingAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :accounting_accounts, id: :uuid do |t|
      t.string :category
      t.string :subcategory
      t.string :name

      t.references :company, index: true, foraign_key: true, type: :uuid

      t.timestamps
    end
  end
end
