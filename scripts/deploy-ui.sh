#!/usr/bin/env bash

set -e

env="${1:-dev}"

export REACT_APP_API_URL="https://taboo-api-$env.uksouth.cloudapp.azure.com"

yarn install

if [[ ! -f ".env" ]]; then
    cp .env{.example,}
fi

sed -i "s#{{apiBaseUrl}}#$REACT_APP_API_URL#g" .env
yarn build

wrangler publish --env "$env"
