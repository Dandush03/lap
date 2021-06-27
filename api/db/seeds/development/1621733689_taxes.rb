return if Tax.any?
puts "Seeding Taxes in #{Rails.env.capitalize}"

Tax.create!([
  { name: 'IVA', value: '0.16', company_id: Company.first.id  },
  { name: 'IVA', value: '0.16', company_id: Company.second.id  }
])