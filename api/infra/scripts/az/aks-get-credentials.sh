#!/usr/bin/env bash

env_name="${1:-dev}"

az aks get-credentials \
    --resource-group "taboo-$env_name-aks-resources" \
    --name "taboo-$env_name-aks"

kubectl config use-context "taboo-$env_name-aks"
