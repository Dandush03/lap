# frozen_string_literal: true

module Api
  # Main Admin Controller
  class AdminsController < ApplicationController
    skip_before_action :authenticate_api_auth_admin!, only: %i[new]
    def new
      render json: { i18n: I18n.t('.') }, status: :ok
    end

    def index
      render json: response_ok, status: :ok
    end

    def response_ok
      {
        company: current_company.json_response,
        articles_groups: current_company.articles_groups,
        articles: current_company.articles.map(&:json_response),
        accounts: accounting_accounts,
        taxes: current_company.taxes,
        exchanges: current_company.exchanges.includes(%i[base_currency secondary_currency
                                                         admin]).map(&:json_response),
        csrf: form_authenticity_token
      }
    end

    def accounting_accounts
      selecte_columns = %i[id name subcategory category]
      accounts = current_company.accounting_accounts.select(selecte_columns)
      {
        buy: accounts.select { |a| a.category == 'out' },
        sell: accounts.select { |a| a.category == 'in' },
        inv: accounts.select { |a| a.category == 'inv' }
      }
    end
  end
end
