# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope module: 'api', path: 'api' do
    scope module: 'v1', path: 'v1' do
      scope module: 'auth' do
        devise_for :users, path: '/auth'
      end
    end
  end


  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :i18n, only: %i[index]
      resources :corporate, only: %i[index]

      namespace :corporate do
        resources :accounting_accounts, only: %i[index create]
        resources :articles_groups, only: %i[index create]
        resources :taxes, only: %i[index]
        resources :articles, only: %i[index create]
        resources :exchanges, only: %i[create index]
      end

      resources :profiles
    end
  end
end
