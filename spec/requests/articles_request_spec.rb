# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Articles', type: :request do
  let!(:company) { create(:company) }
  let!(:user) { create(:user, company_id: company.id) }
  
  describe "logged user" do
    before { sign_in user }

    context "#new" do
      before { get new_article_path(locale: 'en')}

      it 'validate user is logged in' do
        expect(controller.current_user).to eq(user)
      end
  
      it 'get list of articles' do
        get new_article_path(locale: 'en')
        expect(controller.current_user).to eq(user)
      end
    end
  end
end
