# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Article, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"

  describe 'belong to company' do
    it { should belong_to(:company) }
  end

  describe 'belong to account' do
    it { should belong_to(:buy_account).class_name('AccountsCategory').with_foreign_key('buy_account_id') }
    it { should belong_to(:sell_account).class_name('AccountsCategory').with_foreign_key('sell_account_id') }
    it { should belong_to(:inv_account).class_name('AccountsCategory').with_foreign_key('inv_account_id').optional }

  end

  describe 'picture' do
    it { is_expected.to be_an_instance_of(ActiveStorage::Attached::One) }
  end

  describe 'validations' do
    context 'uniqueness' do
      subject { Article.new(sell_price: 200, buy_price: 200) }
      it { should validate_uniqueness_of(:name) }
      it { should validate_uniqueness_of(:sku) }
    end

    context 'presences' do
      it { should validate_presence_of(:sell_price) }
      it { should validate_presence_of(:buy_price) }
    end

    context 'if inventory' do
      before { allow(subject).to receive(:inventory).and_return(true) }
      it { should validate_presence_of(:open_qty) }
    end
  end
end
