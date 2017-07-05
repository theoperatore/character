FROM node:8

RUN ["mkdir", "-p", "/app/src", "/app/bin", "/app/tests"]
WORKDIR /app

COPY ./.babelrc /app
COPY ./package.json /app
COPY ./yarn.lock /app

# this must be deployed from a specific machine
# need to figure out how to better handle secrets...
COPY ./.env /app

RUN ["yarn", "--frozen-lockfile"]

COPY ./bin/. /app/bin/.
COPY ./src/. /app/src/.
COPY ./tests/. /app/tests/.

EXPOSE 9966
