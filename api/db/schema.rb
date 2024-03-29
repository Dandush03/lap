# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_23_030747) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounting_accounts", force: :cascade do |t|
    t.string "category"
    t.string "subcategory"
    t.string "name"
    t.bigint "company_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_accounting_accounts_on_company_id"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "admins", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.string "firstname", default: "", null: false
    t.string "lastname", default: "", null: false
    t.string "username", default: "", null: false
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.bigint "company_id"
    t.bigint "role_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_admins_on_company_id"
    t.index ["confirmation_token"], name: "index_admins_on_confirmation_token", unique: true
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
    t.index ["role_id"], name: "index_admins_on_role_id"
    t.index ["unlock_token"], name: "index_admins_on_unlock_token", unique: true
  end

  create_table "articles", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "sku", default: "", null: false
    t.string "upc"
    t.string "picture"
    t.boolean "inventory", default: false
    t.boolean "product", default: true
    t.boolean "service", default: false
    t.boolean "sell_item", default: false
    t.boolean "buy_item", default: false
    t.decimal "sell_price", precision: 10, scale: 2, default: "0.0"
    t.decimal "buy_price", precision: 10, scale: 2, default: "0.0"
    t.string "sell_description"
    t.string "buy_description"
    t.decimal "open_qty", precision: 10, scale: 2, default: "0.0"
    t.decimal "open_qty_value", precision: 10, scale: 2, default: "0.0"
    t.bigint "sell_account_id"
    t.bigint "buy_account_id"
    t.bigint "inv_account_id"
    t.bigint "sell_account_tax_id"
    t.bigint "buy_account_tax_id"
    t.bigint "company_id"
    t.bigint "articles_group_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["articles_group_id"], name: "index_articles_on_articles_group_id"
    t.index ["buy_account_id"], name: "index_articles_on_buy_account_id"
    t.index ["buy_account_tax_id"], name: "index_articles_on_buy_account_tax_id"
    t.index ["company_id"], name: "index_articles_on_company_id"
    t.index ["inv_account_id"], name: "index_articles_on_inv_account_id"
    t.index ["name"], name: "index_articles_on_name"
    t.index ["sell_account_id"], name: "index_articles_on_sell_account_id"
    t.index ["sell_account_tax_id"], name: "index_articles_on_sell_account_tax_id"
    t.index ["sku"], name: "index_articles_on_sku"
  end

  create_table "articles_groups", force: :cascade do |t|
    t.string "name"
    t.bigint "company_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_articles_groups_on_company_id"
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.string "logo"
    t.string "identification"
    t.bigint "base_currency_id"
    t.bigint "secondary_currency_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["base_currency_id"], name: "index_companies_on_base_currency_id"
    t.index ["identification"], name: "index_companies_on_identification", unique: true
    t.index ["name"], name: "index_companies_on_name", unique: true
    t.index ["secondary_currency_id"], name: "index_companies_on_secondary_currency_id"
  end

  create_table "currencies", force: :cascade do |t|
    t.string "country"
    t.string "name"
    t.string "code", limit: 3, null: false
    t.string "symbol", limit: 3, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "exchanges", force: :cascade do |t|
    t.decimal "value", precision: 13, scale: 2
    t.bigint "base_currency_id"
    t.bigint "secondary_currency_id"
    t.bigint "admin_id"
    t.bigint "company_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["admin_id"], name: "index_exchanges_on_admin_id"
    t.index ["base_currency_id"], name: "index_exchanges_on_base_currency_id"
    t.index ["company_id"], name: "index_exchanges_on_company_id"
    t.index ["secondary_currency_id"], name: "index_exchanges_on_secondary_currency_id"
  end

  create_table "models", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "models_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.bigint "company_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_roles_on_company_id"
  end

  create_table "roles_permitions", force: :cascade do |t|
    t.boolean "allow_view", default: false
    t.boolean "allow_edit", default: false
    t.boolean "allow_create", default: false
    t.boolean "allow_delete", default: false
    t.boolean "allow_assign", default: false
    t.boolean "allow_approve", default: false
    t.boolean "allow_owner", default: false
    t.bigint "role_id"
    t.bigint "models_category_id"
    t.bigint "model_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["model_id"], name: "index_roles_permitions_on_model_id"
    t.index ["models_category_id"], name: "index_roles_permitions_on_models_category_id"
    t.index ["role_id"], name: "index_roles_permitions_on_role_id"
  end

  create_table "taxes", force: :cascade do |t|
    t.string "name"
    t.decimal "value", precision: 10, scale: 2
    t.bigint "company_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_taxes_on_company_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "profile"
    t.string "name"
    t.string "lastname"
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.boolean "admin", default: false
    t.bigint "company_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_users_on_company_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
