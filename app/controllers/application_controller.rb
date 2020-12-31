# frozen_string_literal: true

class ApplicationController < ActionController::Base
  attr_reader :current_company

  per_request_react_rails_prerenderer

  protect_from_forgery

  before_action :authenticate_user!
  around_action :switch_locale
  around_action :set_company

  def default_url_options
    { locale: I18n.locale, company: session[:company] }
  end

  private

  def set_company
    session[:current_company] ||= current_user.company.name if current_user
    @current_company ||= Company.find_by_name(session[:current_company])
    yield
  end

  def switch_locale(&action)
    logger.debug "* Accept-Language: #{request.env['HTTP_ACCEPT_LANGUAGE']}"
    locale = params[:locale] if params[:locale]
    locale ||= extract_locale_from_accept_language_header
    logger.debug "* Locale set to '#{locale}'"
    I18n.with_locale(locale, &action)
  end

  def extract_locale_from_accept_language_header
    request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
  end
end
