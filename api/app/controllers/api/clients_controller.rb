class Api::ClientsController < ApiController
  before_action :authorize_request!

  private

  # Check for valid request token and return user
  def authorize_request!
    raise(ExceptionHandler::MissingToken, Message.missing_token) unless session[:_user_token]
    @current_user = AuthorizeApiRequest.new(session[:_user_token]['value'], request.ip).call[:user]
  end
end
