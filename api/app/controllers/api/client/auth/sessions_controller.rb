class Api::Client::Auth::SessionsController < Api::ClientsController
  skip_before_action :authorize_request!, only: %i[create]
  
  def create
    auth_token =
      AuthenticateUser.new(auth_params[:login], auth_params[:password], request.ip).call
    session[:_user_token] = {
      path: request.url,
      value: auth_token[:token],
      expires: Time.now + 1.hours,
      same_site: :none,
      secure: true,
      httpOnly: true
    }
    user = auth_token[:user]
    remove_columns = %i[password_digest created_at updated_at]
    render json: { user: user.as_json( except: remove_columns), message: 'created user!' }, status: :created
  end

  def auth_params
    params.permit(:login, :password)
  end
end
