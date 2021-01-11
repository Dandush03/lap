# Authenticate Admin by JWT
class AuthenticateAdmin
  def initialize(login, password, request_ip)
    @login = login
    @password = password
    @request_ip = request_ip
  end

  # Service entry point
  def call
    current_user = user
    return unless current_user

    access_token = set_access_token
    token = JsonWebToken.encode(
      token: access_token.token,
      request_ip: access_token.request_ip
    )
    { token: token, user: current_user }
  end

  private

  attr_reader :email, :password, :request_ip
  attr_reader :current_user

  # verify user credentials
  def find_user
    User.find_by(username: @login) || User.find_by(email: @login)
  end

  def user
    @current_user ||= find_user
  
    raise(ExceptionHandler::NotAdmin, Message.not_admin) unless @current_user&.is_admin?

    return @current_user if @current_user&.authenticate(password)

    # raise Authentication error if credentials are invalid
    raise(ExceptionHandler::AuthenticationError, Message.invalid_credentials)
  end

  def set_access_token
    tokens = current_user.tokens
    tokens.destroy_all
    tokens.create(token: token_creator, request_ip: @request_ip)
  end

  def token_creator
    loop do
      token = SecureRandom.hex(20)
      break token unless Token.where(token: token).exists?
    end
  end
end
