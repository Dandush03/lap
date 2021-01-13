# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Company.create!(name: 'lap', identification: 'best!123')
Admin.create!(firstname: 'Daniel', lastname: 'Laloush', email: 'd.laloush@outlook.com', username: 'dandush', password: '123123', password_confirmation: '123123', company_id: '1')