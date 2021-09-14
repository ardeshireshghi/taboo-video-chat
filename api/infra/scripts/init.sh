#!/usr/bin/env bash 

cd terraform || (echo "directory terraform not found" && exit 1)
env_name=${TABOO_ENV:-dev}

terraform init -backend-config="key=$env_name.terraform.tfstate"