return if Exchange.any?
puts "Seeding Exchanges in #{Rails.env.capitalize}"

Exchange.create!(
  [
  { value: 1_600_000.23, base_currency_id: Currency.first.id, secondary_currency_id: Currency.second.id, admin_id: Admin.first.id,
    company_id: Company.first.id  },
  { value: 1_900_000.23, base_currency_id: Currency.first.id, secondary_currency_id: Currency.second.id, admin_id: Admin.first.id,
    company_id: Company.first.id , created_at: 1.days.ago },
  { value: 1_800_000.23, base_currency_id: Currency.first.id, secondary_currency_id: Currency.second.id, admin_id: Admin.first.id,
    company_id: Company.first.id , created_at: 2.days.ago },
  { value: 1_500_000.23, base_currency_id: Currency.first.id, secondary_currency_id: Currency.second.id, admin_id: Admin.first.id,
    company_id: Company.first.id , created_at: 3.days.ago }
]
)