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
