# variable "mongodbatlas_public_key" {
#   sensitive = true
#   type = string
# }

variable "environment" {
  type = string
  default = "dev"
}