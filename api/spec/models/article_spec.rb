# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Article, type: :model do
  it { should belong_to(:company) }
  it { should belong_to(:articles_group) }

  describe 'belong to account' do
    it {
      should belong_to(:buy_account)
        .class_name('AccountingAccount')
        .with_foreign_key('buy_account_id')
        .without_validating_presence
    }
    it {
      should belong_to(:sell_account)
        .class_name('AccountingAccount')
        .with_foreign_key('sell_account_id')
        .without_validating_presence
    }
    it {
      should belong_to(:inv_account)
        .class_name('AccountingAccount')
        .with_foreign_key('inv_account_id')
        .without_validating_presence
    }
  end

  describe 'belong to tax' do
    it {
      should belong_to(:sell_account_tax)
        .class_name('Tax')
        .with_foreign_key('sell_account_tax_id')
        .without_validating_presence
    }
    it {
      should belong_to(:buy_account_tax)
        .class_name('Tax')
        .with_foreign_key('buy_account_tax_id')
        .without_validating_presence
    }
  end

  describe 'validations' do
    it {
      should validate_uniqueness_of(:name)
        .scoped_to(:company_id)
    }
    it {
      should validate_uniqueness_of(:sku)
        .scoped_to(:company_id)
    }
    it {
      should validate_uniqueness_of(:upc)
        .scoped_to(:company_id)
    }
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:sku) }
    it {
      should validate_length_of(:upc)
        .is_equal_to(15)
        .allow_nil.with_message(:upc_length)
    }

    context 'if inventory' do
      before do
        allow(subject)
          .to receive(:inventory)
          .and_return(true)
      end
      it { should validate_presence_of(:inv_account) }
      it { should validate_presence_of(:open_qty) }
      it { should validate_presence_of(:open_qty_value) }
      it {
        should validate_numericality_of(:open_qty_value)
          .is_greater_than(0)
      }
    end

    context 'if is a sell item' do
      before do
        allow(subject)
          .to receive(:sell_item)
          .and_return(true)
      end
      it { should validate_presence_of(:sell_account) }

      it { should validate_presence_of(:sell_price) }
      it {
        should validate_numericality_of(:sell_price)
          .is_greater_than(0)
      }
    end

    context 'if is a buy item' do
      before do
        allow(subject).to receive(:buy_item)
          .and_return(true)
      end
      it { should validate_presence_of(:buy_account) }

      it { should validate_presence_of(:buy_price) }
      it {
        should validate_numericality_of(:buy_price)
          .is_greater_than(0)
      }
    end
  end
end
