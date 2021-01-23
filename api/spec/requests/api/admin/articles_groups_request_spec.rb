# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::Admin::ArticlesGroups', type: :request do
  let(:currency) { create(:currency) }
  let(:company) { create(:company, base_currency_id: currency.id) }
  let(:admin) { create(:admin, company_id: company.id) }
  let(:group) { build(:articles_group) }

  let(:credentials) do
    { api_auth_admin: {
      login: admin.email,
      password: admin.password
    } }
  end

  path '/api/admin/articles_groups' do
    get 'Retrieves All Articles Groups' do
      tags 'ArticlesGroups'
      produces 'application/json'
      parameter in: :cookie, type: :string, required: true, name: :locale

      response '200', 'Fetch Articles Groups' do
        before do
          cookies['locale'] = 'en'
          post '/api/auth/admins/sign_in', params: credentials
        end

        schema type: :array, items: { type: :object }
        run_test!
      end

      response '401', 'Unauthorized User' do
        schema type: :object,
               properties: {
                 message: { type: :string }
               },
               required: %w[message]
        run_test!
      end
    end

    post 'Create New Article Groups' do
      tags 'ArticlesGroups'
      consumes 'application/x-www-form-urlencoded'
      produces 'application/json'
      parameter in: :formData,
                name: :articles_group,
                schema: {
                  type: :object,
                  required: %i[articles_group[name] authenticity_token],
                  properties: {
                    'articles_group[name]': {
                      type: :string,
                      description: 'Name of New Group',
                      example: 'Fruits'
                    },
                    authenticity_token: {
                      type: :string,
                      description: 'CSRF Token Protected'
                    }
                  }
                }

      response '201', 'Create Article Group Successfuly' do
        let(:articles_group) do
          {
            'name': group.name
          }
        end

        before do
          cookies['locale'] = 'en'
          post '/api/auth/admins/sign_in', params: credentials
        end

        schema type: :object,
               properties: {
                 group: {
                   type: :object,
                   properties: {
                     id: { type: :integer },
                     name: { type: :string },
                     company_id: { type: :integer },
                     user_id: { type: :integer },
                     created_at: { type: :string, format: 'date-time' },
                     updated_at: { type: :string, format: 'date-time' }
                   }
                 },
                 message: { type: :string },
                 csrf: { type: :string }
               },
               required: %w[csrf group message]

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['group']['name']).to eq(group.name)
          expect(data['group']['company_id']).to eq(company.id)
        end
      end

      response '200', 'Create Article Group Unsuccessfuly' do
        let(:articles_group) do
          {
            'name': ''
          }
        end

        before do
          cookies['locale'] = 'en'
          post '/api/auth/admins/sign_in', params: credentials
        end

        schema type: :object,
               properties: {
                 group: {
                   type: :object,
                   properties: {
                     id: { type: :integer, nullable: true },
                     name: { type: :string, nullable: true },
                     company_id: { type: :integer, nullable: true },
                     user_id: { type: :integer, nullable: true },
                     created_at: { type: :string, format: 'date-time', nullable: true  },
                     updated_at: { type: :string, format: 'date-time', nullable: true  }
                   }
                 },
                 csrf: { type: :string },
                 message: { type: :object }
               },
               required: %w[csrf group message]

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['message']['name']).to eq(["can't be blank"])
        end
      end

      response '401', 'User not supported' do
        let(:articles_group) do
          {
            'name': group.name
          }
        end

        before do
          cookies['locale'] = 'en'
        end

        schema type: :object,
               properties: {
                 message: { type: :string }
               },
               required: %w[message]

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['message']).to eq('You need to sign in or sign up before continuing.')
        end
      end
    end
  end
end
