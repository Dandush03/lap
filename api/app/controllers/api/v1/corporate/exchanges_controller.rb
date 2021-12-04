# frozen_string_literal: true

module Api
  module V1
    module Corporate
      # Admin Exchange Controller
      class ExchangesController < CorporateController
        def index
          return render json: {
            exchanges_list: ExchangeSerializer.serialize(current_company.exchanges.order(created_at: :desc).offset(offset_number).limit(limit_number)).as_json,
          }, status: 200
        end

        def create
          exchange = current_user.exchanges.new(strong_params)
          if exchange.valid?
            exchange.save!
            return render json: { 
              exchange: exchange.json_response,
              toast: message(
                'created_successfully', 
                scope: %i[exchanges create],
              ) 
            }, status: :created
          end
          msg = exchange.errors.messages
          render json: { 
            exchange: exchange,
            toast: message(
              'created_unsuccessfully', 
              scope: %i[exchanges create],
              type: 'error'
            ) 
          }, status: :ok
        end

        private

        def offset_number
          limit_number * params[:page].to_i
        end

        def limit_number
          params[:rowsPerPage].to_i
        end

        def strong_params
          permit_params = %i[value base_currency_id secondary_currency_id company_id]
          params.require(:exchange).permit(permit_params)
        end
      end
    end
  end
end
