class CreateCompanies < ActiveRecord::Migration[6.1]
  def change
    create_table :companies do |t|
      t.string :name
      t.string :logo

      t.string :identification

      t.timestamps
    end

    add_index :companies, :name,            unique: true
    add_index :companies, :identification,  unique: true
  end
end
