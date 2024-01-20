#!/usr/bin/bash

if [ -z ${MONGO_USERNAME+X} ]; then
    if [ -f .env ]; then
        export $(cat ./.env | xargs)
    else
        export MONGO_USERNAME=root
        export MONGO_PASSOERD=pass
        
        // App ports
        export PUBLIC_APP_PORT=3000
        export BACK_OFFICE_APP_PORT=4000
        export HOUSEKEEPER_APP_PORT=5000
        export SEEDER_APP_PORT=6000
    fi
fi

docker compose -f docker-compose.dev.yml up --build