#!/usr/bin/bash

if [ -z ${MONGO_USERNAME+X} ]; then
    if [ -f .env ]; then
        export $(cat ./.env | xargs)
    else
        export MONGO_USERNAME=root
        export MONGO_PASSWORD=pass
        export MONGODB_NAME=url_shortener
        export MONGO_HOST=mongodb
        export MONGO_PORT=27017
        export REDIS_HOST=redis
        export REDIS_PORT=6379
        export RABBITMQ_USER=user
        export RABBITMQ_PASSWORD=pass
        export RABBITMQ_HOST=rabbitmq
        export RABBITMQ_PORT=5672
        export RABBITMQ_MANAGEMENT_PORT=15672
        export PUBLIC_APP_PORT=3000
        export BACK_OFFICE_APP_PORT=4000
        export HOUSEKEEPER_APP_PORT=5000
        export SEEDER_APP_PORT=6000
        export JWT_SECRET=secret_token_to_be_changed
    fi
fi

if [ -z "$1" ]; then
    export mode=
else
    if [ "$1" = "dev"]; then
        export mode=.dev
    else
        export mode=
    fi
fi

docker compose -f docker-compose${mode}.yml up --build
