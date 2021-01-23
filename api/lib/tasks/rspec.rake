# frozen_string_literal: true

namespace :rspec do
  desc 'Rspec'
  task :development do
    exec 'cd api ; rspec'
  end
end
task rspec: 'rspec:development'
