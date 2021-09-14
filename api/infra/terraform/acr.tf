resource "azurerm_container_registry" "acr" {
  name                     = local.container_registry_name
  resource_group_name      = azurerm_resource_group.taboo.name
  location                 = azurerm_resource_group.taboo.location
  sku                      = "Standard"
  admin_enabled            = false
}