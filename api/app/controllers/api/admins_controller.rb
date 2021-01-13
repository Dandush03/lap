class Api::AdminsController < ApplicationController
  skip_before_action :authenticate_api_admin_auth_admin!, only: %i[new]
  def new
    render json: {i18n: I18n.t('.')}, status: :ok
  end
end
