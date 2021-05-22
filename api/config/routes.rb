# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      # Add Devise Support For Api::V1
      namespace :admins do
        namespace :auth do
          devise_for :admins
        end
        resources :accounting_accounts, only: %i[index create]
        resources :articles_groups, only: %i[index create]
        resources :taxes, only: %i[index]
        resources :articles, only: %i[index create]
        resources :exchanges, only: %i[create]
      end

      resources :profiles
    end
  end
end
