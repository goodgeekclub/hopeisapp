resource "aws_route53_record" "records" {
  for_each = { for key, value in local.route53_records : key => value if value.create }

  zone_id = data.aws_route53_zone.public_zone.zone_id
  name    = each.value.name
  type    = "A"

  alias {
    name                   = each.value.distribution.domain_name
    zone_id                = each.value.distribution.hosted_zone_id
    evaluate_target_health = false
  }
}