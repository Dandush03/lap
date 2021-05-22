#!/bin/bash

docker-compose up -d api

docker-compose exec api bundle
docker-compose exec api rails db:migrate
docker-compose exec api rails db:seed
