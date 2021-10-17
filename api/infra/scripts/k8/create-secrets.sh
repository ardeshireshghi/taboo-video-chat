#!/usr/bin/env bash

env_name="${1:-dev}"

if [[ -z "$JWT_PRIVATE_KEY" ]]; then
    echo "make sure JWT_PRIVATE_KEY is exported"
    exit 1
fi

if [[ -z "$JWT_PUBLIC_KEY" ]]; then
    echo "make sure JWT_PUBLIC_KEY is exported"
    exit 1
fi

if [[ -z "$MAILER_API_KEY" ]]; then
    echo "make sure MAILER_API_KEY is exported"
    exit 1
fi

kubectl delete secret "taboo-api-secrets-$env_name" --ignore-not-found
kubectl create secret generic "taboo-api-secrets-$env_name" \
    --from-literal=jwt-private-key="$JWT_PRIVATE_KEY" \
    --from-literal=mailer-api-key="$MAILER_API_KEY" \
    --from-literal=jwt-public-key="$JWT_PUBLIC_KEY"
