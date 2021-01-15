class ApplicationController < ActionController::Base
  attr_reader :current_company

  before_action :authenticate_api_admin_auth_admin!

  before_action :configure_permitted_parameters, if: :devise_controller?

  around_action :switch_locale
  around_action :set_company

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

  def set_company
    cookies[:current_company] ||= current_api_admin_auth_admin.company.name if current_api_admin_auth_admin
    @current_company ||= Company.find_by_name(cookies[:current_company])
    yield
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
