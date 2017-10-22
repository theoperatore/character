#!/usr/bin/env bash

# run all on remote server
# simple script to stop the current running container,
# pull the latest version of the character-app image
# remove the old container and start up a new container (daemon)
# from the newest image, while exposing the correct ports
IMAGE_NAME=$1
CONTAINER_NAME="character-app-v3"

docker pull $IMAGE_NAME
docker rm -f $CONTAINER_NAME
docker run -d -p 80:80 --name=$CONTAINER_NAME $IMAGE_NAME
