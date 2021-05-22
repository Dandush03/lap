module Api
  class ApiController < ApplicationController
    around_action :switch_locale

    respond_to :json

    protected

    def current_company
      current_api_v1_admin_auth_admin&.company
    end

    def switch_locale(&action)
      logger.debug "* Accept-Language: #{request.env['HTTP_ACCEPT_LANGUAGE']}"
      locale = cookies[:locale]
      locale ||= extract_locale_from_accept_language_header
      cookies[:locale] = locale
      logger.debug "* Locale set to '#{locale}'"
      I18n.with_locale(locale, &action)
    end

    def extract_locale_from_accept_language_header
      request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
    end
  end
end