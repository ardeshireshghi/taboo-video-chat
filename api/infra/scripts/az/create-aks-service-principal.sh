#!/bin/bash
# This script requires Azure CLI version 2.25.0 or later. Check version with `az --version`.

env="${1:-dev}"

# Modify for your environment.
# ACR_NAME: The name of your Azure Container Registry
# SERVICE_PRINCIPAL_NAME: Must be unique within your AD tenant
ACR_NAME=$(./scripts/output.sh | jq '.acr_name.value' | sed s/\"//g)
SERVICE_PRINCIPAL_NAME="taboo-acr-service-principal"

# Obtain the full registry ID for subsequent command args
ACR_REGISTRY_ID=$(az acr show --name "$ACR_NAME" --query id --output tsv)

# Create the service principal with rights scoped to the registry.
# Default permissions are for docker pull access. Modify the '--role'
# argument value as desired:
# acrpull:     pull only
# acrpush:     push and pull
# owner:       push, pull, and assign roles
SP_PASSWD=$(az ad sp create-for-rbac --name $SERVICE_PRINCIPAL_NAME --scopes "$ACR_REGISTRY_ID" --role contributor --query password --output tsv)
SP_APP_ID=$(az ad sp list --display-name $SERVICE_PRINCIPAL_NAME --query [].appId --output tsv)

# Output the service principal's credentials; use these in your services and
# applications to authenticate to the container registry.
echo "Service principal ID: $SP_APP_ID"
echo "Service principal password: $SP_PASSWD"

echo "creating secret for azure container registry called 'taboo-acr-secret-$env'"

kubectl delete secret "taboo-acr-secret-$env" --ignore-not-found
kubectl create secret docker-registry "taboo-acr-secret-$env" \
    --docker-server="$(echo "$ACR_NAME" | tr '[:upper:]' '[:lower:]')".azurecr.io \
    --docker-username="$SP_APP_ID" \
    --docker-password="$SP_PASSWD"