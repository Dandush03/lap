# frozen_string_literal: true

module Api
  module V1
      module Auth
        # Admin Sessions Controller
        class SessionsController < Devise::SessionsController
          prepend_before_action :require_no_authentication, only: [:create]
          prepend_before_action :authenticated_user, only: [:new]
          clear_respond_to
          respond_to :json

          # GET /resource/sign_in
          def new
            render json: { csrf: csrf }, status: :ok
          end

          def create
            binding.pry
            super do
              return render json: { user: current_user, csrf: csrf }, status: 201
            end
          end

          def destroy
            super do
              return render json: { toast: toastify, csrf: csrf }, status: 202
            end 
          end

          private

          def toastify
            { message: find_message(:signed_out), type: 'info'}
          end

          def csrf
            { resource_name: resource_name, authToken: form_authenticity_token }
          end

          def authenticated_user
            return unless warden.authenticated?(resource_name)

            render json: { user: current_user, csrf: csrf }, status: 202
          end
        end
      end
    end
end
