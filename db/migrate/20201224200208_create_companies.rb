class CreateCompanies < ActiveRecord::Migration[6.0]
  def change
    create_table :companies do |t|
      t.string :name
      t.string :indentification
      
      t.timestamps
    end

    add_index :companies, :name,            unique: true
    add_index :companies, :indentification, unique: true

  end
end
