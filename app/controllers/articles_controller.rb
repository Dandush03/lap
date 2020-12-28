# frozen_string_literal: true

class ArticlesController < ApplicationController
  def index
    Article.all
  end

  def new
    @article = Article.new
  end

  def create
    puts 'test'
    puts 'test'
    puts 'test'
    a = Article.new(strong_params)
    puts a.inspect
    puts 'test'
    a.valid?
    flash.now[:errors] = a.errors.messages
    render :new
  end

  private

  def strong_params
    params.require(:article).permit(%i[product service name sku upc])
  end
end
