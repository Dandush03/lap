return if AccountingAccount.any?
puts "Seeding AccountingAccounts in #{Rails.env.capitalize}"

AccountingAccount.create!(
  [
    { name: 'General income', category: 'in', subcategory: 'Incomes', company_id: Company.first.id  },
    { name: 'Interest income', category: 'in', subcategory: 'Incomes', company_id: Company.first.id  },
    { name: 'Uncategorized', category: 'out', subcategory: 'Expenses', company_id: Company.first.id  },
    { name: 'Office suplies', category: 'out', subcategory: 'Expenses', company_id: Company.first.id  },
    { name: 'Costs of obtaining raw materials', category: 'out', subcategory: 'Production', company_id: Company.first.id  },
    { name: 'Inventory asset', category: 'inv', subcategory: 'existence', company_id: Company.first.id  },
    { name: 'Finished goods', category: 'inv', subcategory: 'existence', company_id: Company.first.id  }
  ]
)