# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AccountsCategory, type: :model do
  it { should belong_to(:company) }
  it { should have_many(:articles) }

  it { should validate_presence_of(:name) }
  it { should validate_uniqueness_of(:name).scoped_to(:company_id) }
  
  it { should validate_presence_of(:category) }
  it { should allow_value('inv').for(:category) }
  it { should allow_value('in').for(:category) }
  it { should allow_value('out').for(:category) }
end
