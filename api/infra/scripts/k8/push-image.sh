#!/usr/bin/env bash

# run this in the api directory
yarn install
yarn build

docker build -t taboo-api .
docker tag taboo-api tabooappregistry.azurecr.io/taboo-api
az acr login --name tabooappregistry
docker push tabooappregistry.azurecr.io/taboo-api:latest
