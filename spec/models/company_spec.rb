require 'rails_helper'

RSpec.describe Company, type: :model do
  it { should have_many(:users) } 
end
