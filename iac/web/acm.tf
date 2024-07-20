resource "aws_acm_certificate" "cert" {
  count             = var.environment == "dev" ? 1 : 0
  domain_name       = local.domain_name
  subject_alternative_names = [
    "*.${local.domain_name}"
  ]
  validation_method = "DNS"

  tags = local.common_tags

  lifecycle {
    create_before_destroy = true
  }

  provider = aws.cert-provider
}

resource "aws_route53_record" "validation" {
  for_each = try({
    for dvo in aws_acm_certificate.cert[0].domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }, {} )

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.public_zone.id

  provider = aws.cert-provider
}

resource "aws_acm_certificate_validation" "validation" {
  count            = var.environment == "dev" ? 1 : 0
  certificate_arn  = aws_acm_certificate.cert[0].arn

  provider = aws.cert-provider
}