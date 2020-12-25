# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'companies#index', as: 'company_root'

  scope '/:locale' do
    scope '/:company' do
      root to: 'articles#index'
    end
  end
end
