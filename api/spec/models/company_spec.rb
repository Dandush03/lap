# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Company, type: :model do
  it { should belong_to(:base_currency) }
  it {
    should belong_to(:secondary_currency)
      .without_validating_presence
  }

  it { should have_many(:users) }
  it { should have_many(:exchanges) }
  it { should have_many(:accounting_accounts) }
  it { should have_many(:articles_groups) }
  it { should have_many(:articles) }
  it { should have_many(:taxes) }

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:identification) }

  it { should validate_uniqueness_of(:name) }
  it { should validate_uniqueness_of(:identification) }
end
