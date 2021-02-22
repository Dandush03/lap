modules = {inventory: %i[Article ArticlesGroup], accounting: %i[AccountingAccount Exchange Currency] }
def categories
  modules.keys.map do |k|
    ModelsCategory.create!(name: k)
    modules[k].map {|c| Model.create(name: c)}
  end
end
  
def seed_roles_permitions(company, role)
  
end