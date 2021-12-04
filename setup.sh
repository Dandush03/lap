#!/bin/bash

set -e
set -x
docker stop $(docker ps -aq)
rm -f docker-compose.yml
  
if [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    ln -s docker-compose.linux.yml docker-compose.yml
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
    ln -s docker-compose.win64.yml docker-compose.yml
fi

docker-compose pull
docker-compose build

docker-compose up -d

run() {
  docker-compose run --rm $1 "${@:2}"
}

(
  run corporate yarn &
  run client yarn 
) &

(
  run api rails db:create
  run api rails db:migrate
  run api rails db:seed
)
