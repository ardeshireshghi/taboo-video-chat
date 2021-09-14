output "cluster_egress_ip" {
  value = data.azurerm_public_ip.taboo.ip_address
}

output "acr_name" {
  value = local.container_registry_name
}