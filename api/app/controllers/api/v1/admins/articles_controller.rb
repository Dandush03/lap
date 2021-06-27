# frozen_string_literal: true

module Api
  module V1
    module Admins
      # Admin Article Controller
      class ArticlesController < AdminsController
        def index
          render json: {}
        end

        def create
          article = current_company.articles.new(strong_params)
          if article.valid?
            article.save
            flash[:notice] = 'Article successfully created'
            return render json: { article: ArticleSerializer.new(article) }, status: :created
          end
          msg = article.errors.messages
          render json: { message: msg }, status: :ok
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
      end
    end
  end
end
