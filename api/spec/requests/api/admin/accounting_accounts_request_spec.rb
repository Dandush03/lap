# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'Api::Admin::AccountingAccounts', type: :request do
  let(:admin) { create(:admin) }
  let(:account) { build(:accounting_account, :inv) }

  let(:credentials) do
    { api_auth_admin: {
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
          post '/api/auth/admins/sign_in', params: credentials
        end
        schema type: :object,
               properties: {
                 buy: { type: :array, items: { type: :object } },
                 sell: { type: :array, items: { type: :object } },
                 inv: { type: :array, items: { type: :object } }
               },
               required: %w[buy sell inv]
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

    post 'Create New Account' do
      tags 'AccountingAccounts'
      consumes 'application/x-www-form-urlencoded'
      produces 'application/json'
      parameter in: :formData,
                name: :accounting_account,
                schema: {
                  type: :object,
                  required: %i[accounting_account[name] accounting_account[category] accounting_account[subcategory]
                               authenticity_token],
                  properties: {
                    'accounting_account[name]': {
                      type: :string,
                      description: 'Name of New Category',
                      example: 'General Income'
                    },
                    'accounting_account[category]': {
                      type: :string,
                      description: 'Category Should be inv, in, or out',
                      example: 'in'
                    },
                    'accounting_account[subcategory]': {
                      type: :string,
                      description: 'SubCategory refer to the group which the category will belong to',
                      example: 'Income'
                    },
                    authenticity_token: {
                      type: :string,
                      description: 'CSRF Token Protected'
                    }
                  }
                }

      response '201', 'Create Accounting Account Successfuly' do
        let(:accounting_account) do
          {
            'name': account.name,
            'category': account.category,
            'subcategory': account.subcategory
          }
        end

        before do
          cookies['locale'] = 'en'
          post '/api/auth/admins/sign_in', params: credentials
        end

        schema type: :object,
               properties: {
                 account: {
                   type: :object,
                   properties: {
                     id: { type: :integer },
                     name: { type: :string },
                     category: { type: :string },
                     subcategory: { type: :string },
                     company_id: { type: :integer },
                     user_id: { type: :integer },
                     created_at: { type: :string, format: 'date-time' },
                     updated_at: { type: :string, format: 'date-time' }
                   }
                 },
                 message: { type: :string },
                 csrf: { type: :string }
               },
               required: %w[csrf account message]

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['account']['category']).to eq(account.category)
          expect(data['account']['subcategory']).to eq(account.subcategory)
          expect(data['account']['name']).to eq(account.name)
        end
      end

      response '200', 'Create Accounting Account Unsuccessfuly' do
        let(:accounting_account) do
          {
            'name': account.name,
            'category': account.category
          }
        end

        before do
          cookies['locale'] = 'en'
          post '/api/auth/admins/sign_in', params: credentials
        end

        schema type: :object,
               properties: {
                 account: {
                   type: :object,
                   properties: {
                     id: { type: :integer, nullable: true },
                     name: { type: :string, nullable: true },
                     category: { type: :string, nullable: true },
                     subcategory: { type: :string, nullable: true },
                     company_id: { type: :integer, nullable: true },
                     user_id: { type: :integer, nullable: true },
                     created_at: { type: :string, format: 'date-time', nullable: true  },
                     updated_at: { type: :string, format: 'date-time', nullable: true  }
                   }
                 },
                 csrf: { type: :string },
                 message: { type: :object }
               },
               required: %w[csrf account message]

        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['account']['category']).to eq(account.category)
          expect(data['account']['name']).to eq(account.name)
          expect(data['account']['company_id']).to eq(admin.company_id)
          expect(data['message']['subcategory']).to eq(["can't be blank"])
        end
      end

      response '401', 'User not supported' do
        let(:accounting_account) do
          {
            'name': account.name,
            'category': account.category
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
