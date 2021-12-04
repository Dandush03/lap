# frozen_string_literal: true

# Company Serializer
class CompanySerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :logo, :identification, :currency, :logo

  def currency
    except_columns = %i[updated_at created_at]
    {
      base: object.base_currency.as_json(except: except_columns),
      secondary: object.secondary_currency.as_json(except: except_columns)
    }
  end

  def logo
    return unless object.logo.attached?

    rails_blob_path(object.logo, only_path: true)
  end
end
