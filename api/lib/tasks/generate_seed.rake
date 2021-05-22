# frozen_string_literal: true

task :gseed do |_, args|
  time = Time.now.to_i
  file_name = "#{args.join('_')}.rb"
  path = Rails.root.join('db', 'seeds', Rails.env)
  abort 'File already exist' unless Dir.glob("#{path}/*_#{file_name}").empty?

  File.new("#{path}/#{time}_#{file_name}", 'w')
  puts "created #{path}/#{time}_#{file_name}"
end
