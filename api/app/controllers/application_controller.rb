class ApplicationController < ActionController::API
  include ExceptionHandler
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  protect_from_forgery
  
  before_action :set_csrf_cookie

  attr_accessor :current_user
  
  def set_csrf_cookie
    cookies["CSRF_TOKEN"] = form_authenticity_token
  end
end
