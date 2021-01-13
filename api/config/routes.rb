Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    scope(path_names: { new: 'i18n' }) do
      resource :admin, only: %i[new]
    end
    
    namespace :admin do
      namespace :auth do
        devise_for :admins
      end
    end

    namespace :client do
      namespace :auth do
        resource :sessions, path: 'sign_in', only: %i[create destroy]
      end
    end
  end
end
