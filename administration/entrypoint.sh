#!/bin/bash

set -e

cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/

if [[ $RAILS_ENV == 'productiosn' ]]; then
  yarn build
  serve -l 3001 -s build
else
  exec "$@"
fi
