# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Company.create!({ name: 'lap', identification: 'v-123' })
User.create!({ email: 'admin@example.com', username: 'admin', password: '123123', password_confirmation: '123123', company_id: '1' })
