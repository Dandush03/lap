return if ArticlesGroup.any?

puts "Seeding ArticlesGroups in #{Rails.env.capitalize}"

ArticlesGroup.create!(
  [
    { name: 'Part of Cars', company_id: Company.first.id  },
    { name: 'Cars', company_id: Company.first.id  }
  ]
)
