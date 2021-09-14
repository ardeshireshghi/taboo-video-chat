data "azurerm_public_ip" "taboo" {
  name                = reverse(split("/", tolist(azurerm_kubernetes_cluster.taboo.network_profile.0.load_balancer_profile.0.effective_outbound_ips)[0]))[0]
  resource_group_name = azurerm_kubernetes_cluster.taboo.node_resource_group
}