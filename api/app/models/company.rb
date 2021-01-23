# frozen_string_literal: true

class Company < ApplicationRecord
  belongs_to :base_currency, class_name: 'Currency', foreign_key: 'base_currency_id'
  belongs_to :secondary_currency, class_name: 'Currency', foreign_key: 'secondary_currency_id', optional: true

  has_one_attached :logo

  has_many :users, class_name: 'User', foreign_key: 'company_id'
  has_many :articles, class_name: 'Article', foreign_key: 'company_id'
  has_many :accounting_accounts, class_name: 'AccountingAccount', foreign_key: 'company_id'
  has_many :articles_groups, class_name: 'ArticlesGroup', foreign_key: 'company_id'
  has_many :taxes, class_name: 'Tax', foreign_key: 'company_id'

  validates :name, presence: true, uniqueness: true
  validates :identification, presence: true, uniqueness: true

  def json_response
    except_columns = %i[updated_at created_at logo]
    response = as_json(except: except_columns).merge(currency: currencies)
    return response unless logo.attached?

    response.merge({ logo: rails_blob_path(logo, only_path: true) })
  end

  def currencies
    except_columns = %i[updated_at created_at logo]
    {
      base: base_currency.as_json(except: except_columns),
      secondary: secondary_currency.as_json(except: except_columns)
    }
  end
end
