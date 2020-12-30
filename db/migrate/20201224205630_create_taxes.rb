class CreateTaxes < ActiveRecord::Migration[6.0]
  def change
    create_table :taxes do |t|
      t.string :name
      t.decimal :value, precision: 10, scale: 2
      t.timestamps
    end
  end
end
