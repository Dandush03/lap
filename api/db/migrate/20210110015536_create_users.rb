# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users, id: :uuid do |t|
      t.string :profile
      t.string :name
      t.string :lastname
      t.string :username
      t.string :email
      t.string :password_digest

      t.boolean :admin, default: false

      t.references :company, index: true, foraign_key: true, type: :uuid
      t.timestamps
    end
  end
end
