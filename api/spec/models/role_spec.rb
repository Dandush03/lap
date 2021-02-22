# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Role, type: :model do
  it { should belong_to(:company) }
  it { should have_many(:roles_permitions) }
end
