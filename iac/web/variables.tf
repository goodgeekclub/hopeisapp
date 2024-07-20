#####################
# General
#####################
variable "environment" {
  type    = string
  default = "dev"
}

#####################
# CloudFront
#####################
variable "cloudfront_price_class" {
  type = string
}

variable "cloudfront_alias" {
  type    = list(string)
  default = []
}
