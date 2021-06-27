module Api
  module V1
    class I18nController < ApiController
      def index
        render json: { i18n: I18n.t('.') }, status: :ok
      end
    end
  end
end