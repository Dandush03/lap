# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Exchange, type: :model do
  it { should belong_to(:company) }
  it { should belong_to(:admin) }

  it {
    should belong_to(:base_currency)
      .class_name('Currency')
      .with_foreign_key('base_currency_id')
  }

  it {
    should belong_to(:secondary_currency)
      .class_name('Currency')
      .with_foreign_key('secondary_currency_id')
  }

  it {
    should validate_numericality_of(:value)
      .is_greater_than(0)
  }
end
