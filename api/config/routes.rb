# frozen_string_literal: true

Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    scope(path_names: { new: 'i18n' }) do
      resources :admins, only: %i[new index]
    end

    scope module: 'admin' do
      namespace :auth do
        devise_for :admins
      end
    end

    namespace :admin do
      resources :accounting_accounts, only: %i[index create]
      resources :articles_groups, only: %i[index create]
      resources :taxes, only: %i[index]
      resources :articles, only: %i[index create]
    end

    namespace :client do
      namespace :auth do
        resource :sessions, path: 'sign_in', only: %i[create destroy]
      end
    end
  end
end
