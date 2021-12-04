#!/bin/bash
docker stop $(docker ps -aq)

if [[ $1 == 'dev' ]]; then
  docker-compose up
elif [[ $1 == 'build' ]] && [[ $2 == 'dev' ]]; then
  docker-compose up --build
elif [[ $1 == 'build' ]]; then
  docker-compose up -d --build
else
  docker-compose up -d
fi
