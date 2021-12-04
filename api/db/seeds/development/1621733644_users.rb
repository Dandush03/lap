# frozen_string_literal: true

return if User.any?

puts "Seeding Users in #{Rails.env.capitalize}"

User.create!([
                { firstname: 'Daniel',
                  lastname: 'Laloush',
                  email: 'd.laloush@outlook.com',
                  username: 'dandush',
                  password: '123123',
                  password_confirmation: '123123',
                  corporate: true,
                  company_id: Company.first.id 
                },
                {
                  firstname: 'Daniel',
                  lastname: 'Laloush',
                  email: 'd.laloush1@outlook.com',
                  username: 'dandush1',
                  password: '123123',
                  corporate: false,
                  password_confirmation: '123123',
                  company_id: Company.first.id
                }
              ])
