# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Articles', driver: :selenium_chrome, js: true do
  let!(:company) { create(:company) }
  let!(:user) { create(:user, company_id: company.id) }
  let!(:inv_accounts) { create_list(:accounts_category, 3, :inv, company_id: company.id) }
  let!(:sell_accounts) { create_list(:accounts_category, 3, :in, company_id: company.id) }
  let!(:buy_accounts) { create_list(:accounts_category, 3, :out, company_id: company.id) }
  let!(:articles_groups) { create_list(:articles_group, 3, company_id: company.id) }
  let!(:taxes) { create_list(:tax, 3, company_id: company.id) }

  describe 'the create posts process' do
    before :each do
      visit new_user_session_path
      fill_in 'user[email]', with: user.email
      fill_in 'user[password]', with: user.password

      click_button 'Log in'
    end

    context '#new' do
      before :each do
        visit new_article_path(locale: 'en')
        I18n.locale = 'en'
      end

      it 'should have a menu bar' do
        expect(page).to have_content I18n.t('side_menu.articles')[0][:title]
        expect(page).to have_content I18n.t('side_menu.articles')[1][:name]
        expect(page).to have_content I18n.t('side_menu.articles')[2][:name]
      end

      it 'should fill article info and create article' do
        find_field('Article Group').send_keys(:arrow_down)
        find_field('Article Group').send_keys(:arrow_down)
        find_field('Article Group').send_keys(:enter)
        fill_in 'article[name]', with: Faker::Name.unique.name
        fill_in 'article[sku]', with: Faker::Number.number(digits: 10)
        fill_in 'article[upc]', with: Faker::Number.number(digits: 12)
        
        click_button 'save'
        expect(page).to have_current_path(articles_path(locale: 'en'))
      end
    end
  end
end
