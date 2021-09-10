#!/usr/bin/env bash

set -e

yarn install

if [[ -f "./env " ]]; then
    echo ".env file already created"
else
    cp .env{.example,}
    sed -i ''  's#{{apiBaseUrl}}#http://localhost:8001#g' .env
    echo "created .env file with default values for development"
fi

