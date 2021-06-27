# frozen_string_literal: true

module Api
  module V1
    module Admins
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

          private

          def csrf
            { resource_name: resource_name, authToken: form_authenticity_token }
          end

          def authenticated_user
            return unless warden.authenticated?(resource_name)

            render json: { user: current_api_v1_auth_admin, csrf: csrf }, status: 202
          end
        end
      end
    end
  end
end
