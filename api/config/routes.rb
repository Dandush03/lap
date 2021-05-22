# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      # Add Devise Support For Api::V1
      namespace :auth do
      end

      resources :profiles
    end
  end
end
