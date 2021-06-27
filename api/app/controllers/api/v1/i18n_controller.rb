# frozen_string_literal: true

module Api
  module V1
    # Translation Controller
    class I18nController < ApiController
      def index
        render json: { i18n: I18n.t('.') }, status: :ok
      end
    end
  end
end
