# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ArticlesGroup, type: :model do
  it { should belong_to(:company) }
  it { should have_many(:articles) }

  it { should validate_presence_of(:name) }

  it { should validate_uniqueness_of(:name).scoped_to(:company_id) }
end
