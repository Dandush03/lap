# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RolesPermition, type: :model do
  it { should belong_to(:model) }
  it { should belong_to(:models_category) }
  it { should belong_to(:role) }
end
