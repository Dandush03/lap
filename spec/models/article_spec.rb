require 'rails_helper'

RSpec.describe Article, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
  
  describe "belong to company" do
    it { should belong_to(:company) } 
  end

  describe "belong to account" do
    it { should belong_to(:buy_account).class_name('AccountsCategory').with_foreign_key('buy_account_id') } 
    it { should belong_to(:inv_account).class_name('AccountsCategory').with_foreign_key('inv_account_id').optional } 
    it { should belong_to(:sell_account).class_name('AccountsCategory').with_foreign_key('sell_account_id') } 
  end
end
