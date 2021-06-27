# frozen_string_literal: true

module Api
  module V1
    module Admins
      # Admin Exchange Controller
      class ExchangesController < AdminsController
        def create
          exchange = current_api_auth_admin.exchanges.new(strong_params)
          if exchange.valid?
            exchange.save!
            return render json: { exchange: exchange.json_response,
                                  message: 'created successfuly',
                                  csrf: form_authenticity_token },
                          status: :created
          end
          msg = exchange.errors.messages
          render json: { exchange: exchange, message: msg, csrf: form_authenticity_token }, status: :ok
        end
  
        private
  
        def strong_params
          permit_params = %i[value base_currency_id secondary_currency_id company_id]
          params.require(:exchange).permit(permit_params)
        end
      end
    end
  end
end
