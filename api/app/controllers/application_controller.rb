# frozen_string_literal: true

# Main App Controller
class ApplicationController < ActionController::Base
  before_action :authenticate_api_admin_auth_admin!

  before_action :configure_permitted_parameters, if: :devise_controller?

  around_action :switch_locale

  respond_to :json

  def default_url_options
    { locale: I18n.locale, company: cookies[:company] }
  end

  protected

  def configure_permitted_parameters
    att_create = %i[avatar full_name username email password password_confirmation]
    att_update = %i[avatar full_name username email password current_password]
    devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(att_create) }
    devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(att_update) }
  end

  def current_company
    Company.find_by_name(current_api_admin_auth_admin.company.name) if current_api_admin_auth_admin
  end

  def switch_locale(&action)
    logger.debug "* Accept-Language: #{request.env['HTTP_ACCEPT_LANGUAGE']}"
    locale = cookies[:locale] if cookies[:locale]
    locale ||= extract_locale_from_accept_language_header
    cookies[:locale] = locale
    logger.debug "* Locale set to '#{locale}'"
    I18n.with_locale(locale, &action)
  end

  def extract_locale_from_accept_language_header
    request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
  end
end
