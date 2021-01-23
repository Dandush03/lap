# frozen_string_literal: true

namespace :routes do
  desc 'Rails Routes'
  task :development do
    exec 'cd api ; rails routes'
  end
end
task routes: 'routes:development'
