FROM node:8

RUN ["mkdir", "-p", "/app/src", "/app/bin", "/app/tests"]
WORKDIR /app

COPY ./.babelrc /app
COPY ./package.json /app
COPY ./yarn.lock /app
COPY ./webpack.prod.js /app

# this must be deployed from a specific machine
# need to figure out how to better handle secrets...
# possibly using docker secrets to handle the environment?
COPY ./.env /app

RUN ["yarn", "--frozen-lockfile"]

COPY ./src/. /app/src/.
COPY ./tests/. /app/tests/.
