# frozen_string_literal: true

class ArticlesController < ApplicationController
  def index
    Article.all
  end

  def new
    selecte_columns = %i[id name subcategory]
    @article = Article.new
    @buy_accounts = current_company_user.accounts_categories.buy_accounts.select(selecte_columns)
    @sell_accounts = current_company_user.accounts_categories.sell_accounts.select(selecte_columns)
    @inv_accounts = current_company_user.accounts_categories.inv_accounts.select(selecte_columns)
    @taxes = current_company_user.taxes.all.select(%i[id name value])
  end

  def create
    puts 'test1'
    puts 'test1'
    a = Article.new(strong_params)
    a.save
    puts a.inspect
    puts 'test1'
    a.valid?
    # flash.now[:errors] = a.errors.messages
    # render :new
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
end
