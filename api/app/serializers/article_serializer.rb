# frozen_string_literal: true

# Article Serializer
class ArticleSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :sku, :upc, :picture, :inventory,
             :product, :service, :sell_item, :buy_item, :sell_price,
             :buy_price, :sell_description, :buy_description, :open_qty,
             :open_qty_value, :sell_account_id, :buy_account_id, :inv_account_id,
             :sell_account_tax_id, :buy_account_tax_id, :articles_group_id,
             :created_at, :updated_at

  def self.serialize(articles)
    ActiveModel::Serializer::CollectionSerializer.new(
      articles,
      each_serializer: self
    )
  end

  def picture
    return unless object.picture.attached?

    rails_blob_path(object.picture, only_path: true)
  end
end
