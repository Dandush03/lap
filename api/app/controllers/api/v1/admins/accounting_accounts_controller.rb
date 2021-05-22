# frozen_string_literal: true

module Api
  module V1
    module Admins
      # Admin Accounting Acoounts Controller
      class AccountingAccountsController < ApplicationController
        def index
          render json: set_accounts, status: :ok
        end
  
        def create
          account = current_company.accounting_accounts.new(secure_params)
          if account.valid?
            account.save!
            return render json: { account: account, message: 'created successfuly', csrf: form_authenticity_token },
                          status: :created
          end
          msg = account.errors.messages
          render json: { account: account, message: msg, csrf: form_authenticity_token }, status: :ok
        end
  
        private
  
        def set_accounts
          selecte_columns = %i[id name subcategory]
          {
            buy: current_company.accounting_accounts.buy_accounts.select(selecte_columns),
            sell: current_company.accounting_accounts.sell_accounts.select(selecte_columns),
            inv: current_company.accounting_accounts.inv_accounts.select(selecte_columns)
          }
        end
  
        def secure_params
          params.require(:accounting_account).permit(%i[name category subcategory])
        end
      end
    end
  end
end
