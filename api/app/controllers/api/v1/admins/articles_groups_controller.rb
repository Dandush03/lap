# frozen_string_literal: true

module Api
  module V1
    module Admins
      # Admin Article Groups Controller
      class ArticlesGroupsController < ApplicationController
        def index
          render json: set_groups, status: :ok
        end
  
        def create
          group = current_company.articles_groups.new(secure_params)
          if group.valid?
            group.save!
            return render json: { group: group, message: 'created successfuly', csrf: form_authenticity_token },
                          status: :created
          end
          msg = group.errors.messages
          render json: { group: group, message: msg, csrf: form_authenticity_token }, status: :ok
        end
  
        private
  
        def secure_params
          params.require(:articles_group).permit(:name)
        end
  
        def set_groups
          selecte_columns = %i[id name]
          current_company.articles_groups.all.select(selecte_columns)
        end
      end
    end
  end
end
