class Api::Admin::AccountingAccountsController < ApplicationController
  def show
    render json: set_accounts, status: :ok
  end

  def create; end

  private

  def set_accounts
    selecte_columns = %i[id name subcategory]
    {
      buy: current_company.accounting_accounts.buy_accounts.select(selecte_columns),
      sell: current_company.accounting_accounts.sell_accounts.select(selecte_columns),
      inv: current_company.accounting_accounts.inv_accounts.select(selecte_columns),
    }
  end
end
