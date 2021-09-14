variable "prefix" {
  description = "A prefix used for all resources in this example"
}

variable "env_name" {
  description = "Name of the environment"
   validation {
    condition     = contains(["dev", "staging", "prod"], var.env_name)
    error_message = "Allowed values for input_parameter are \"dev\", \"staging\", or \"prod\"."
  }
}
variable "location" {
  description = "The Azure Region in which all resources in this example should be provisioned"
}