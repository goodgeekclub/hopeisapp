data "aws_route53_zone" "public_zone" {
  name         = local.domain_name
  private_zone = false
}

data "aws_acm_certificate" "cert" {
  count  = var.environment != "dev" ? 1 : 0
  domain = local.domain_name
  types  = ["AMAZON_ISSUED"]

  provider = aws.cert-provider
}