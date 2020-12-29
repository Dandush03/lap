# frozen_string_literal: true

class ArticlesController < ApplicationController
  def index
    Article.all
  end

  def new
    @article = Article.new
    @buy_accounts = AccountsCategory.buy_accounts
    @sell_accounts = AccountsCategory.sell_accounts
    @inv_accounts = AccountsCategory.inv_accounts
  end

  def create
    puts 'test1'
    puts 'test1'
    a = Article.new(strong_params)
    a.save
    puts a.inspect
    puts 'test1'
    a.valid?
    flash.now[:errors] = a.errors.messages
    render :new
  end

  private

  def strong_params
    params.require(:article).permit(%i[product service name sku upc picture sell_item sell_price])
  end
end
