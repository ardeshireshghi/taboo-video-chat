#!/usr/bin/env bash

set -e

env="${1:-dev}"

export REACT_APP_API_URL="https://taboo-api-$env.uksouth.cloudapp.azure.com"

yarn install
yarn build

npx gh-pages -d build
