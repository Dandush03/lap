# frozen_string_literal: true

# Exchange Serializer
class ExchangeSerializer < ActiveModel::Serializer
  attributes :id, :value, :created_by, :base, :secondary, :created_at

  belongs_to :base_currency, class_name: 'Currency', foreign_key: 'base_currency_id'
  belongs_to :secondary_currency, class_name: 'Currency', foreign_key: 'secondary_currency_id'
  belongs_to :admin, class_name: 'Admin', foreign_key: 'admin_id'

  def self.serialize(exchanges)
    ActiveModel::Serializer::CollectionSerializer.new(
      exchanges.includes(%i[base_currency secondary_currency admin]),
      each_serializer: self
    )
  end

  def base
    object.base_currency.code
  end

  def secondary
    object.secondary_currency.code
  end

  def created_by
    "#{object.admin.firstname} #{object.admin.lastname}"
  end
end
