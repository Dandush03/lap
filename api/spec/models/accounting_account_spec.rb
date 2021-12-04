# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AccountingAccount, type: :model do
  it { should belong_to(:company) }
  it {
    should have_many(:buy_articles)
      .class_name('Article')
      .with_foreign_key('buy_account_id')
  }
  it {
    should have_many(:sell_articles)
      .class_name('Article')
      .with_foreign_key('sell_account_id')
  }
  it {
    should have_many(:inv_articles)
      .class_name('Article')
      .with_foreign_key('sell_account_id')
  }

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:subcategory) }
  it {
    should validate_uniqueness_of(:name)
      .scoped_to(:company_id)
  }

  it { should validate_presence_of(:category) }
  it {
    should allow_value('inv')
      .for(:category)
  }
  it {
    should allow_value('in')
      .for(:category)
  }
  it {
    should allow_value('out')
      .for(:category)
  }
end
