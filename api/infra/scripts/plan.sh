#!/usr/bin/env bash 

cd terraform || (echo "directory terraform not found" && exit 1)
env_name=${TABOO_ENV:-dev}

terraform plan -var-file="./envs/$env_name.tfvars" -out=tfplan
