# frozen_string_literal: true

class CreateArticles < ActiveRecord::Migration[6.1]
  def change
    create_table :articles, id: :uuid do |t|
      t.string  :name, null: false, default: ''
      t.string  :sku,  null: false, default: ''
      t.string :upc

      t.string :picture

      t.boolean :inventory, default: false
      t.boolean :product,   default: true
      t.boolean :service,   default: false

      t.boolean :sell_item,  default: false
      t.boolean :buy_item,   default: false

      t.decimal :sell_price, precision: 10, scale: 2, default: 0
      t.decimal :buy_price,  precision: 10, scale: 2, default: 0

      t.string :sell_description
      t.string :buy_description

      t.decimal :open_qty, precision: 10, scale: 2, default: 0
      t.decimal :open_qty_value,  precision: 10, scale: 2, default: 0

      t.references :sell_account, index: true, foraign_key: { to_table: :accounting_accounts }, type: :uuid
      t.references :buy_account,  index: true, foraign_key: { to_table: :accounting_accounts }, type: :uuid
      t.references :inv_account,  index: true, foraign_key: { to_table: :accounting_accounts }, type: :uuid

      t.references :sell_account_tax, index: true, foraign_key: { to_table: :taxes }, type: :uuid
      t.references :buy_account_tax, index: true, foraign_key: { to_table: :taxes }, type: :uuid

      t.references :company, index: true, foraign_key: true, type: :uuid
      t.references :articles_group, index: true, foraign_key: true, type: :uuid

      t.timestamps
    end

    add_index :articles, :name
    add_index :articles, :sku
  end
end
