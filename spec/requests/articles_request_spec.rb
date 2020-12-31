# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Articles', type: :request do
  let!(:company) { create(:company) }
  let!(:user) { create(:user, company_id: company.id) }
  let!(:inv_accounts) { create_list(:accounts_category, 3, :inv, company_id: company.id) }
  let!(:sell_accounts) { create_list(:accounts_category, 3, :in, company_id: company.id) }
  let!(:buy_accounts) { create_list(:accounts_category, 3, :out, company_id: company.id) }
  let!(:articles_groups) { create_list(:articles_group, 3, company_id: company.id) }
  let!(:taxes) { create_list(:tax, 3, company_id: company.id) }
  
  describe "logged user" do
    before { sign_in user }

    context "#new instace variables" do
      before { get new_article_path(locale: 'en')}
      it 'validate user is logged in' do
        expect(controller.current_user).to eq(user)
      end
      it 'validate article groups' do
        expect(controller.instance_variable_get(:@articles_group)).to eq(articles_groups)
      end
      it 'validate inv accounts' do
        expect(controller.instance_variable_get(:@inv_accounts)).to eq(inv_accounts)
      end
      it 'validate sell accounts' do
        expect(controller.instance_variable_get(:@sell_accounts)).to eq(sell_accounts)
      end
      it 'validate buy accounts' do
        expect(controller.instance_variable_get(:@buy_accounts)).to eq(buy_accounts)
      end
      it 'validate taxes' do
        expect(controller.instance_variable_get(:@taxes)).to eq(taxes)
      end
    end

    
  end
end
