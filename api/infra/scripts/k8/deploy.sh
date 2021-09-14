#!/usr/bin/env bash

load_balancer_ip="$(./scripts/output.sh | jq '.cluster_egress_ip.value' | sed s/\"//g)"
env_name="${1:-dev}"


./scripts/az/aks-get-credentials.sh "$env_name"

# Deploy nginx-ingress controller
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

kubectl create namespace ingress-basic

# helm delete ingress-nginx
helm install ingress-nginx2 ingress-nginx/ingress-nginx \
    --namespace ingress-basic \
    --set controller.service.loadBalancer.ingress.ip="$load_balancer_ip" \
    --set controller.service.externalTrafficPolicy=Local \
    --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-dns-label-name"="taboo-api-$env_name"

# Deploy the deployment and service to run the pod
cat < ./k8/taboo-api.yaml | sed "s/{{envName}}/$env_name/g" |  kubectl apply -f -

# Add ingress resource to be used by nginx-ingress for load balancing and public ip/dns
kubectl apply -f ./k8/taboo-ingress.yaml
