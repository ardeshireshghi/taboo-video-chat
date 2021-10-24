#!/usr/bin/env bash 

cd terraform || (echo "directory terraform not found" && exit 1)

terraform init -reconfigure
terraform output -json 
