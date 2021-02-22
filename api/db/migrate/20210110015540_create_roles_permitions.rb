# frozen_string_literal: true

class CreateRolesPermitions < ActiveRecord::Migration[6.1]
  def change
    create_table :roles_permitions do |t|
      t.boolean :allow_view,     default: false
      t.boolean :allow_edit,     default: false
      t.boolean :allow_create,   default: false
      t.boolean :allow_delete,   default: false
      t.boolean :allow_assign,   default: false
      t.boolean :allow_approve,  default: false
      t.boolean :allow_owner,    default: false

      t.references :role, index: true, foraign_key: true

      t.references :models_category, index: true, foraign_key: true
      t.references :model, index: true, foraign_key: true

      t.timestamps
    end
  end
end
