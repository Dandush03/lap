class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles do |t|
      t.string :name, null: false, default: ""
      t.string :sku,  null: false, default: ""

      t.string :description
      t.string :picture

      t.boolean :inventory, default: true
      t.boolean :product,   default: true
      t.boolean :service,   default: false

      t.decimal :sell_price, precision: 10, scale: 2, null: false
      t.decimal :buy_price,  precision: 10, scale: 2, null: false

      t.references :sell_account, index: true, foraign_key: { to_table: :accounts_categories}
      t.references :buy_account,  index: true, foraign_key: { to_table: :accounts_categories}
      t.references :inv_account,  index: true, foraign_key: { to_table: :accounts_categories}
      
      t.references :company, index: true, foraign_key: true

      t.timestamps
    end

    add_index :articles, :name, unique: true
    add_index :articles, :sku,  unique: true
  end
end
