require 'rails_helper'

RSpec.describe Tax, type: :model do
  it { should belong_to(:company) }
  it { should have_many(:buy_articles).class_name('Article').with_foreign_key('buy_account_tax_id') }
  it { should have_many(:sell_articles).class_name('Article').with_foreign_key('sell_account_tax_id') }

  it { should validate_presence_of(:name) }
  it { should validate_uniqueness_of(:name).scoped_to(:company_id) }

  it { should validate_presence_of(:value) }
  it { should validate_numericality_of(:value).is_greater_than(0) }
end
