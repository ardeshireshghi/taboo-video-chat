resource "azurerm_kubernetes_cluster" "taboo" {
  name                = "${var.prefix}-aks"
  location            = azurerm_resource_group.taboo.location
  resource_group_name = azurerm_resource_group.taboo.name
  dns_prefix          = "taboo-dns-prefix"

  default_node_pool {
    name           = "taboopool"
    node_count     = 1
    vm_size        = "Standard_B2s"
    vnet_subnet_id = azurerm_subnet.taboo.id
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin    = "kubenet"
    load_balancer_sku = "Standard"
  }
}
