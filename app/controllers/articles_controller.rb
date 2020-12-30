# frozen_string_literal: true

class ArticlesController < ApplicationController
  def index
    Article.all
  end

  def new
    set_lists
  end

  def create
    a = Article.new(strong_params)
    a.save
    puts a.inspect
    a.valid?

    set_lists
    flash.now[:errors] = a.errors.messages
    render :new 
  end

  private

  def strong_params
    permited_values = %i[
      product service name sku upc picture
      sell_item sell_price sell_account_id sell_account_tax_id
      buy_item buy_price buy_account_id buy_account_tax_id
    ]
    params.require(:article).permit(permited_values)
  end

  def set_lists
    selecte_columns = %i[id name subcategory]
    @buy_accounts = current_company.accounts_categories.buy_accounts.select(selecte_columns)
    @sell_accounts = current_company.accounts_categories.sell_accounts.select(selecte_columns)
    @inv_accounts = current_company.accounts_categories.inv_accounts.select(selecte_columns)
    @taxes = current_company.taxes.all.select(%i[id name value])
  end
end
