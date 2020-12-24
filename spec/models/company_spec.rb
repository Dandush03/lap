require 'rails_helper'

RSpec.describe Company, type: :model do
  it { should have_many(:users) } 
  it { should have_many(:accounts_categories) } 
  it { should have_many(:articles) } 
end
