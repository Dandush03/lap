# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'Api::Admin::AccountingAccounts', type: :request do
  let(:company) { create(:company) }
  let(:admin) { create(:admin, company_id: company.id) }

  let(:credentials) do
    { api_admin_auth_admin: {
      login: admin.email,
      password: admin.password
    } }
  end

  path '/api/admin/accounting_accounts' do
    get 'Retrieves All Accounting Accounts' do
      tags 'AccountingAccounts'
      produces 'application/json'
      parameter in: :cookie, type: :string, required: true, name: :locale
      
      response '200', 'Fetch Accountings Accounts' do
        before do
          cookies['locale'] = 'en'
          post '/api/admin/auth/admins/sign_in', params: credentials
        end

        schema type: :object,
               properties: {
                 buy: { type: :array, items: { type: :object} },
                 sell: { type: :array, items: { type: :object} },
                 inv: { type: :array, items: { type: :object} },
               },
               required: %w[buy sell inv]
        run_test!

       
      end

      response '401', 'Unauthorized User' do
        schema type: :object,
               properties: {
                message: { type: :string },
               },
               required: %w[message]
        run_test!
      end
    end
  end
end
