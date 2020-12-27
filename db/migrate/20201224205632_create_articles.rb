# frozen_string_literal: true

class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles do |t|
      t.string :name, null: false, default: ''
      t.string :sku,  null: false, default: ''

      t.string :description
      t.string :picture

      t.boolean :inventory, default: true
      t.boolean :product,   default: true
      t.boolean :service,   default: false

      t.boolean :sell_item,  default: true
      t.boolean :buy_item,   default: true

      t.decimal :sell_price, precision: 10, scale: 2, default: 0
      t.decimal :buy_price,  precision: 10, scale: 2, default: 0
      t.float :open_qty

      t.references :sell_account, index: true, foraign_key: { to_table: :accounts_categories }
      t.references :buy_account,  index: true, foraign_key: { to_table: :accounts_categories }
      t.references :inv_account,  index: true, foraign_key: { to_table: :accounts_categories }

      t.references :company, index: true, foraign_key: true

      t.references :articles_group, index: true, foraign_key: true

      t.timestamps
    end

    add_index :articles, :name
    add_index :articles, :sku
  end
end
