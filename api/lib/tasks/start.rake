namespace :start do
  desc 'Start dev server'
  task :development do
    exec 'foreman start -f Procfile.dev'
  end

  desc 'Start production server'
  task :production do
    yarn_front = 'yarn --cwd web'
    yarn_back = 'yarn --cwd backend'
    yarn_build = 'yarn --cwd web build'
    yarn_deploy = 'yarn --cwd web deploy'
    nginx_reset = 'sudo systemctl restart nginx'
    start_server = 'foreman start -f Procfile'

    exec "#{yarn_front} ; #{yarn_back} ; #{yarn_build} ; #{yarn_deploy} ; #{nginx_reset} ; #{start_server}"
  end
end
task start: 'start:development'
task deploy: 'start:production'
