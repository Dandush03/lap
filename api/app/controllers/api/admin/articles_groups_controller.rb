class Api::Admin::ArticlesGroupsController < ApplicationController
  def show
    render json: set_groups, status: :ok
  end

  def create; end

  private

  def set_groups
    selecte_columns = %i[id name]
    ArticlesGroup.all.select(selecte_columns)
  end
end
