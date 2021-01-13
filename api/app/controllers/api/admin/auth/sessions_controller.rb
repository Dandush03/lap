class Api::Admin::Auth::SessionsController < Api::AdminsController
  skip_before_action :authorize_request!, only: %i[create show]

  def show
    return render json: { message: 'not logged in' }, status: :ok unless current_user

    remove_columns = %i[password_digest created_at updated_at]
    render json: { user: current_user.as_json( except: remove_columns), message: 'created session!' }, status: :created 
  end

  def create
    auth_token =
      AuthenticateAdmin.new(auth_params[:login], auth_params[:password], request.ip).call
    session[:_user_token] = {
      path: request.url,
      value: auth_token[:token],
      expires: Time.now + 1.hours,
      same_site: :none,
      secure: true,
      httpOnly: true
    }
    cookies[:user_token_id123123] = {
      value: auth_token[:token],
      expires: Time.now + 1.hours
    }
    user = auth_token[:user]
    remove_columns = %i[password_digest created_at updated_at]
    puts 'test'
    puts 'test'
    puts 'test'
    puts user.inspect
    puts 'test'
    puts 'test'
    render json: { message: 'created session!' }, status: :created
  end

  def auth_params
    params.require(:user).permit(:login, :password)
  end
end
