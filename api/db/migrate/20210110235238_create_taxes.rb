# frozen_string_literal: true

class CreateTaxes < ActiveRecord::Migration[6.1]
  def change
    create_table :articles_groups, id: :uuid do |t|
      t.string :name

      t.references :company, index: true, foraign_key: true, type: :uuid

      t.timestamps
    end
  end
end
