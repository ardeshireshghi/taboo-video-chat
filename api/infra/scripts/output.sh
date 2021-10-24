#!/usr/bin/env bash 

cd terraform || (echo "directory terraform not found" && exit 1)

terraform init -backend-config key=dev.terraform.tfstate -reconfigure > /dev/null
terraform output -json 
