data "aws_route53_zone" "public_zone" {
  name         = local.domain_name
  private_zone = false
}