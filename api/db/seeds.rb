# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Currency.create!(
  [
    { name: 'USD', code: 'USD', symbol: '$', country: 'USA' },
    { name: 'Bolivares', code: 'VES', symbol: 'Bs', country: 'Venezuela' },
    { name: 'Shekel', code: 'NIS', symbol: '₪', country: 'Israel' }
  ]
)

ModelsCategory.create!(name: 'inventory')
ModelsCategory.create!([{ name: 'inventory' }, { name: 'accounting' }, { name: 'sell' }])

Model.create!([{ name: 'Article' },
                { name: 'ArticlesGroup' },
                { name: 'AccountingAccounts' },
                { name: 'Exchange' },
                { name: 'Currency' }])

Company.create!(name: 'lap', identification: 'best!123', base_currency_id: '1', secondary_currency_id: '2')

Role.create!([{ name: 'admin', company_id: Company.first.id }, { name: 'staff', company_id: Company.first.id }])


Admin.create!([
                { firstname: 'Daniel',
                  lastname: 'Laloush',
                  email: 'd.laloush@outlook.com',
                  username: 'dandush',
                  password: '123123',
                  password_confirmation: '123123',
                  role_id: '1',
                  company_id: '1' 
                },
                {
                  firstname: 'Daniel',
                  lastname: 'Laloush',
                  email: 'd.laloush1@outlook.com',
                  username: 'dandush1',
                  password: '123123',
                  password_confirmation: '123123',
                  company_id: '1',
                  role_id: '1'
                }
              ])

Tax.create!({ name: 'IVA', value: '0.16', company_id: '1' })

Exchange.create!([
                   { value: 1_600_000.23, base_currency_id: '1', secondary_currency_id: '2', admin_id: '1',
                     company_id: '1' },
                   { value: 1_900_000.23, base_currency_id: '1', secondary_currency_id: '2', admin_id: '1',
                     company_id: '1', created_at: 1.days.ago },
                   { value: 1_800_000.23, base_currency_id: '1', secondary_currency_id: '2', admin_id: '1',
                     company_id: '1', created_at: 2.days.ago },
                   { value: 1_500_000.23, base_currency_id: '1', secondary_currency_id: '2', admin_id: '1',
                     company_id: '1', created_at: 3.days.ago }
                 ])

AccountingAccount.create!(
  [
    { name: 'General income', category: 'in', subcategory: 'Incomes', company_id: '1' },
    { name: 'Interest income', category: 'in', subcategory: 'Incomes', company_id: '1' },
    { name: 'Uncategorized', category: 'out', subcategory: 'Expenses', company_id: '1' },
    { name: 'Office suplies', category: 'out', subcategory: 'Expenses', company_id: '1' },
    { name: 'Costs of obtaining raw materials', category: 'out', subcategory: 'Production', company_id: '1' },
    { name: 'Inventory asset', category: 'inv', subcategory: 'existence', company_id: '1' },
    { name: 'Finished goods', category: 'inv', subcategory: 'existence', company_id: '1' }
  ]
)

ArticlesGroup.create!(
  [
    { name: 'Part of Cars', company_id: '1' },
    { name: 'Cars', company_id: '1' }
  ]
)
