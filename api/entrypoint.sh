#!/bin/bash

set -e

if [ -f tmp/pids/server.pid ]; then
  rm tmp/pids/server.pid
fi

if [[ $RAILS_ENV == 'production' ]]; then
  bundle exec rails assets:precompile 
  bundle exec rails s -b 0.0.0.0
else 
  exec "$@"
fi


