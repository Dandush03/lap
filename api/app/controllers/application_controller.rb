class ApplicationController < ActionController::API
  protect_from_forgery
  
  before_action :set_csrf_cookie
  include ExceptionHandler
  include ::ActionController::Cookies

  attr_accessor :current_user
  
  def set_csrf_cookie
    cookies["CSRF-TOKEN"] = form_authenticity_token
  end
end
