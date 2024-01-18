#!/usr/bin/bash

if [ -z ${MONGO_USERNAME+X} ]; then
    if [ -f .env ]; then 
        source ./.env
    else
        export MONGO_USERNAME=root
        export MONGO_PASSOERD=pass
    fi
fi

docker compose -f docker-compose.dev.yml up --build