# frozen_string_literal: true

class CreateRoles < ActiveRecord::Migration[6.1]
  def change
    create_table :roles do |t|
      t.string :name

      t.references :company, index: true, foraign_key: true

      t.timestamps
    end
  end
end
