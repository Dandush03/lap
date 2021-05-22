# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Model, type: :model do
  it { should have_many(:roles_permitions) }

  it { should validate_presence_of(:name).on(:create) }
end
