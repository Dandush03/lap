# frozen_string_literal: true

class CreateModelsCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :models_categories do |t|
      t.string :name

      t.timestamps
    end
  end
end
