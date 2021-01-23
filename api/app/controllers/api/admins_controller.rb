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
        csrf: form_authenticity_token
      }
    end

    def accounting_accounts
      selecte_columns = %i[id name subcategory]
      {
        buy: current_company.accounting_accounts.buy_accounts.select(selecte_columns),
        sell: current_company.accounting_accounts.sell_accounts.select(selecte_columns),
        inv: current_company.accounting_accounts.inv_accounts.select(selecte_columns)
      }
    end
  end
end
