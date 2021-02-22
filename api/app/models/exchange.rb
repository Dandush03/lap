# frozen_string_literal: true

class Exchange < ApplicationRecord
  belongs_to :base_currency, class_name: 'Currency', foreign_key: 'base_currency_id'
  belongs_to :secondary_currency, class_name: 'Currency', foreign_key: 'secondary_currency_id'
  belongs_to :admin, class_name: 'Admin', foreign_key: 'admin_id'
  belongs_to :company, class_name: 'Company', foreign_key: 'company_id'

  validates :value, presence: true, numericality: { greater_than: 0 }

  def json_response
    except_columns = %i[updated_at company_id admin_id]
    as_json(except: except_columns)
      .merge({
               base: base_currency.code,
               secondary: secondary_currency.code,
               created_by: "#{admin.firstname} #{admin.lastname}"
             })
  end
end
