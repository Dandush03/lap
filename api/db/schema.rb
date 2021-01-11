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

ActiveRecord::Schema.define(version: 2021_01_10_235435) do

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
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["identification"], name: "index_companies_on_identification", unique: true
    t.index ["name"], name: "index_companies_on_name", unique: true
  end

  create_table "taxes", force: :cascade do |t|
    t.string "name"
    t.decimal "value", precision: 10, scale: 2
    t.bigint "company_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_taxes_on_company_id"
  end

  create_table "tokens", force: :cascade do |t|
    t.string "token"
    t.string "request_ip"
    t.bigint "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["token"], name: "index_tokens_on_token", unique: true
    t.index ["user_id"], name: "index_tokens_on_user_id"
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

  add_foreign_key "tokens", "users"
end