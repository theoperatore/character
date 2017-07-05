#!/usr/bin/env bash

# run all on remote server
IMAGE_NAME=$1
CONTAINER_NAME="character-app"

docker pull $IMAGE_NAME
docker rm -f $CONTAINER_NAME
docker run -d -p 80:80 --name=$CONTAINER_NAME $IMAGE_NAME
