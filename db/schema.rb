# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_12_24_205632) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts_categories", force: :cascade do |t|
    t.string "type"
    t.string "name"
    t.bigint "company_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_accounts_categories_on_company_id"
  end

  create_table "articles", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "sku", default: "", null: false
    t.string "description"
    t.string "picture"
    t.boolean "inventory", default: true
    t.boolean "product", default: true
    t.boolean "service", default: false
    t.bigint "sell_account_id"
    t.bigint "buy_account_id"
    t.bigint "inv_account_id"
    t.bigint "company_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["buy_account_id"], name: "index_articles_on_buy_account_id"
    t.index ["company_id"], name: "index_articles_on_company_id"
    t.index ["inv_account_id"], name: "index_articles_on_inv_account_id"
    t.index ["name"], name: "index_articles_on_name", unique: true
    t.index ["sell_account_id"], name: "index_articles_on_sell_account_id"
    t.index ["sku"], name: "index_articles_on_sku", unique: true
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.string "identification"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["identification"], name: "index_companies_on_identification", unique: true
    t.index ["name"], name: "index_companies_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "username", default: "", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
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
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_users_on_company_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
