# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'belong to company' do
    it { should belong_to(:company) }
  end

  describe 'validation' do
    it { should validate_uniqueness_of(:username) }
  end
end
