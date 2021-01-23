# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'Api::Admin::Auth::Sessions', type: :request do
  let(:currency) { create(:currency) }
  let(:company) { create(:company, base_currency_id: currency.id) }
  let(:admin) { create(:admin, company_id: company.id) }
  let(:locale) { 'es' }

  path '/api/auth/admins/sign_in' do
    before { cookies['locale'] = 'es' }
    get 'Retrieves CSRF Token And User' do
      tags 'Sessions'
      produces 'application/json'
      parameter in: :cookie, type: :string, required: true, name: :locale

      response '200', 'Fetch CSRF Token' do
        schema type: :object,
               properties: {
                 locale: { type: :string, default: 'es' },
                 csrf: {
                   type: :object,
                   properties: {
                     resource_name: { type: :string },
                     authToken: { type: :string }
                   }
                 }
               },
               required: %w[csrf]
        run_test!
      end

      response '202', 'Fetch CSRF Token and User if Already Login' do
        before do
          post '/api/auth/admins/sign_in', params: {
            api_auth_admin: {
              login: admin.email,
              password: admin.password
            }
          }
        end
        schema type: :object,
               properties: {
                 locale: { type: :string, default: 'es' },
                 csrf: {
                   type: :object,
                   properties: {
                     resource_name: { type: :string },
                     authToken: { type: :string }
                   }
                 },
                 user: {
                   type: :object,
                   properties: {
                     id: { type: :integer },
                     firstname: { type: :string },
                     lastname: { type: :string },
                     username: { type: :string },
                     email: { type: :string },
                     company_id: { type: :integer },
                     user_id: { type: :integer },
                     created_at: { type: :string, format: 'date-time' },
                     updated_at: { type: :string, format: 'date-time' }
                   }
                 }
               },
               required: %w[csrf user]
        run_test!
      end
    end

    post 'Login User' do
      tags 'Sessions'
      consumes 'application/x-www-form-urlencoded'
      parameter name: :api_auth_admin, in: :formData, schema: {
        type: :object,
        required: %i[api_auth_admin[login] api_auth_admin[password]],
        properties: {
          authenticity_token: { type: :string },
          'api_auth_admin[login]': { type: :string },
          'api_auth_admin[password]': { type: :password }
        }
      }

      response '201', 'Login User' do
        let(:api_auth_admin) do
          {
            'api_admin_auth[login]': admin.username,
            'api_admin_auth[password]': '123123'
          }
        end
        run_test!
      end
    end
  end
end
