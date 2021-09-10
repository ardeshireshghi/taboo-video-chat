#!/usr/bin/env bash

set -e

docker compose build

./scripts/run-dependencies.sh
docker compose up taboo-api -d --force-recreate
docker compose logs -f taboo-api
