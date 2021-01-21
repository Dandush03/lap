Dir.glob(File.join(File.dirname(__FILE__), 'api', '**', "Gemfile")) do |gemfile|
  eval(IO.read(gemfile), binding)
end