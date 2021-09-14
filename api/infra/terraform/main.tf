terraform {
    required_version = ">= 1.0.6"
}

provider "azurerm" {
  features {}
}

terraform {
  backend "azurerm" {
    resource_group_name  = "taboo-terraform"
    storage_account_name = "tabooterraform"
    container_name       = "tf-state"
    # key is passed as `-backend-config` param per env
  }
}

locals {
  environment_name        = "${var.env_name}"
  resource_group_name     = "${var.prefix}-aks-resources"
  container_registry_name = "tabooAppRegistry"
  location                = "${var.location}"
}

resource "azurerm_resource_group" "taboo" {
  name     = "${local.resource_group_name}"
  location = "${local.location}"
}

resource "azurerm_virtual_network" "taboo" {
  name                = "${var.prefix}-vnet"
  location            = azurerm_resource_group.taboo.location
  resource_group_name = azurerm_resource_group.taboo.name
  address_space       = ["192.168.0.0/16"]
}

resource "azurerm_subnet" "taboo" {
  name                 = "${var.prefix}-subnet"
  resource_group_name  = azurerm_resource_group.taboo.name
  address_prefixes     = ["192.168.1.0/24"]
  virtual_network_name = azurerm_virtual_network.taboo.name
  service_endpoints    = ["Microsoft.Sql"]
}
