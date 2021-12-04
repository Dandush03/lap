# Boaz

## Requirement
Before proceeding to install any volume please make sure you have installed `docker` & `docker-compose` you can get them from [this site](https://docs.docker.com/get-docker/)
>if you're using Linux .env make sure that your docker installation is not under snap store ( DO NOT USE SNAP TO INSTALL DOCKER ) be sure to enable your user to allow docker to exec as sudo on the subdirectories in this repo `sudo chown -R $USER:$USER .`

##  Instalation
### Windows
Execute setup.sh file from the terminal using
`bash setup.sh`
or exec each line inside setup.sh seperatly e.g.:
```bash
  docker-compose pull
  docker-compose build

  docker-compose up -d api

  docker-compose exec api rails db:create
  docker-compose exec api rails db:migrate
  docker-compose exec api rails db:seed
```

### Linux
Execute setup.sh file running the following command in gnome-terminal or any other termianl of your preference
`./setup.sh`

## Running Localy

You can execute `start.sh` file or run `docker-compose up` if you want to be able to see all logs related to this volume
>remember that you can always use:
> - [] `docker-compose exec ${IMAGE} bash` to enter the desire enviroment
> - [] `docker-compose exec logs tail=100 ${IMAGE}` if you want to see the logs you can use

# Thanks for your time