# frozen_string_literal: true

return if Currency.any?

puts "Seeding Currency in #{Rails.env.capitalize}"

Currency.create!(
  [
    { name: 'USD', code: 'USD', symbol: '$', country: 'USA' },
    { name: 'Bolivares', code: 'VES', symbol: 'Bs', country: 'Venezuela' },
    { name: 'Shekel', code: 'NIS', symbol: '₪', country: 'Israel' }
  ]
)
