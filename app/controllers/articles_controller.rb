# frozen_string_literal: true

class ArticlesController < ApplicationController
  def index; end

  def new
    set_lists
  end

  def create
    article = current_company.articles.new(strong_params)
    if article.valid?
      article.save
      return redirect_to articles_path(locale: I18n.locale)
    end

    set_lists
    flash.now[:errors] = article.errors.messages
    render :new, locale: I18n.locale
  end

  private

  def strong_params
    permited_values = %i[
      product service name sku upc picture articles_group_id
      sell_item sell_price sell_account_id sell_account_tax_id
      buy_item buy_price buy_account_id buy_account_tax_id
      inventory open_qty open_qty_value inv_account_id
    ]
    params.require(:article).permit(permited_values)
  end

  def set_lists
    selecte_columns = %i[id name subcategory]
    @articles_group = current_company.articles_groups.select(%i[id name])
    @buy_accounts = current_company.accounts_categories.buy_accounts.select(selecte_columns)
    @sell_accounts = current_company.accounts_categories.sell_accounts.select(selecte_columns)
    @inv_accounts = current_company.accounts_categories.inv_accounts.select(selecte_columns)
    @taxes = current_company.taxes.all.select(%i[id name value])
  end
end
