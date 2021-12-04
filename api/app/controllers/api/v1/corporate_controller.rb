# frozen_string_literal: true

module Api
  module V1
    # Admin Controller
    class CorporateController < ApiController
      before_action :authenticate_corporate_user!

      before_action :configure_permitted_parameters, if: :devise_controller?

      def index
        render json: AdminMainSerializer.process(current_company)
      end

      protected

      def current_company
        current_user&.company
      end

      def configure_permitted_parameters
        att_create = %i[avatar full_name username email password password_confirmation]
        att_update = %i[avatar full_name username email password current_password]
        devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(att_create) }
        devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(att_update) }
      end
    end
  end
end
