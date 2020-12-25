# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Article, type: :model do
  it { should belong_to(:company) }
  it { should belong_to(:articles_group) }

  describe 'belong to account' do
    it { should belong_to(:buy_account).class_name('AccountsCategory').with_foreign_key('buy_account_id') }
    it { should belong_to(:sell_account).class_name('AccountsCategory').with_foreign_key('sell_account_id') }
    it { should belong_to(:inv_account).class_name('AccountsCategory').with_foreign_key('inv_account_id').optional }
  end

  describe 'validations' do
    context 'uniqueness' do
      subject { Article.new(sell_price: 200, buy_price: 200) }
      it { should validate_uniqueness_of(:name).scoped_to(:company_id) }
      it { should validate_uniqueness_of(:sku).scoped_to(:company_id) }
    end

    context 'presences' do
      it { should validate_presence_of(:sell_price) }
      it { should validate_presence_of(:buy_price) }
      it { should validate_presence_of(:name) }

      it { should validate_presence_of(:sku) }
    end

    context 'if inventory' do
      before { allow(subject).to receive(:inventory).and_return(true) }
      it { should validate_presence_of(:open_qty) }
    end
  end
end
