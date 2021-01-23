# frozen_string_literal: true

namespace :reset do
  desc 'Reset dev server'
  task :development do
    exec 'cd api ; rails db:drop ; rails db:create ; rails db:migrate ; rails db:seed'
  end
end
task reset: 'reset:development'
