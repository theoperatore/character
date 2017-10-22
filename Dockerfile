FROM node:8

RUN ["mkdir", "-p", "/app/src", "/app/public"]
WORKDIR /app

COPY ./.npmrc /app
COPY ./package.json /app
COPY ./yarn.lock /app

# this must be deployed from a specific machine
# need to figure out how to better handle secrets...
# possibly using docker secrets to handle the environment?
COPY ./.env /app

RUN ["yarn", "--frozen-lockfile"]

COPY ./public/. /app/public/.
COPY ./src/. /app/src/.
