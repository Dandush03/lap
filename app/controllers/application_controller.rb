# frozen_string_literal: true

class ApplicationController < ActionController::Base
  attr_reader :current_company_user

  protect_from_forgery

  before_action :authenticate_user!
  before_action :authorize_company!
  around_action :switch_locale
  around_action :set_company

  def default_url_options
    { locale: I18n.locale, company: current_company_user }
  end

  private

  def authorize_company!
    session[:current_company] ||= current_user.company.id
    @current_company_user = Company.find(session[:current_company])
  end

  def set_company

  end

  def switch_locale(&action)
    logger.debug "* Accept-Language: #{request.env['HTTP_ACCEPT_LANGUAGE']}"
    locale = extract_locale_from_accept_language_header
    logger.debug "* Locale set to '#{locale}'"
    I18n.with_locale(locale, &action)
  end
  
  def extract_locale_from_accept_language_header
    request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
  end
end
