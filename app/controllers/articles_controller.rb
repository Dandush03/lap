# frozen_string_literal: true

class ArticlesController < ApplicationController
  def index
    puts 'test'
    puts 'test'
    puts I18n.t('.side_menu')
    puts 'test'
    puts 'test'
  end
end
