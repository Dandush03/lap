# frozen_string_literal: true

# Main Application Entrie
class ApplicationController < ActionController::Base

  def message(option, scope: [], type: 'info')
    {message: t(option.to_sym, scope: scope.map(&:to_sym)), type: type}
  end

  def authenticate_corporate_user!
    user = warden.authenticate! if !devise_controller?
  end
end
