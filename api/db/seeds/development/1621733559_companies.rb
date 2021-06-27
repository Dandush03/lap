return if Company.any?
puts "Seeding Companies in #{Rails.env.capitalize}"

Company.create!(
  [
    {name: 'lap', identification: 'best!123', base_currency_id: Currency.first.id, secondary_currency_id: Currency.second.id},
    {name: 'ensof', identification: '123', base_currency_id: Currency.first.id, secondary_currency_id: Currency.second.id}
  ]
)
