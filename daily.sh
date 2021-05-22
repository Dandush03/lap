#!/bin/bash

docker-compose up -d api client

docker-compose exec api bundle
docker-compose exec api rails db:migrate
docker-compose exec api rails db:seed

docker-compose exec client yarn
