class CreateAccountingAccounts < ActiveRecord::Migration[6.1]
  def change
    create_table :accounting_accounts do |t|
      t.string :category
      t.string :subcategory
      t.string :name

      t.references :company, index: true, foraign_key: true

      t.timestamps
    end
  end
end
