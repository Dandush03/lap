#!/bin/bash

set -e
set -x

rm -f docker-compose.yml
  
if [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    ln -s docker-compose.linux.yml docker-compose.yml
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
    ln -s docker-compose.win64.yml docker-compose.yml
fi

docker-compose pull
docker-compose build

docker-compose up -d api

docker-compose exec api rails db:create
docker-compose exec api rails db:migrate
docker-compose exec api rails db:seed

./start.sh
