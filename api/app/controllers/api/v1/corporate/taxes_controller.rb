# frozen_string_literal: true

module Api
  module V1
    module Corporate
      # Taxes Admin Controller
      class TaxesController < CorporateController
        def index
          render json: set_taxes, status: :ok
        end

        private

        def set_taxes
          selecte_columns = %i[id name value]
          current_company.taxes.all.select(selecte_columns)
        end
      end
    end
  end
end
