class Api::Admin::ArticlesController < ApiController
  def new
    render json: set_lists
  end

  private

  def set_lists
    {
      selecte_columns = %i[id name subcategory],
      articles_group = current_company.articles_groups.select(%i[id name]),
      buy_accounts = current_company.accounts_categories.buy_accounts.select(selecte_columns),
      sell_accounts = current_company.accounts_categories.sell_accounts.select(selecte_columns),
      inv_accounts = current_company.accounts_categories.inv_accounts.select(selecte_columns),
      taxes = current_company.taxes.all.select(%i[id name value])
    }
  end
end
