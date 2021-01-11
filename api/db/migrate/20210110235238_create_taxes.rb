class CreateTaxes < ActiveRecord::Migration[6.1]
  def change
    create_table :articles_groups do |t|
      t.string :name

      t.references :company, index: true, foraign_key: true

      t.timestamps
    end
  end
end
