class ApplicationController < ActionController::API
  include ExceptionHandler
  include ::ActionController::Cookies

  attr_accessor :current_user
end
