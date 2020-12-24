require 'rails_helper'

RSpec.describe AccountsCategory, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"

  describe "belong to company" do
    it { should belong_to(:company) } 
  end
end
