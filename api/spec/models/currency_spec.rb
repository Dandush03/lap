# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Currency, type: :model do
  let(:currency) { build(:currency) }

  subject { currency }

  it {
    should validate_presence_of(:country)
  }

  it {
    should validate_uniqueness_of(:country)
  }

  it { should validate_presence_of(:name) }
  it {
    should validate_uniqueness_of(:name)
  }

  it {
    should validate_length_of(:symbol)
      .is_at_least(1)
      .is_at_most(3)
      .with_message(:invalid_symbol)
  }

  it {
    should validate_length_of(:code)
      .is_equal_to(3)
      .with_message(:invalid_code)
  }
end
