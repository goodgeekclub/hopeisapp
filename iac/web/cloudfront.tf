resource "aws_cloudfront_origin_access_control" "oac" {
  for_each                          = local.buckets
  name                              = "OAC-${aws_s3_bucket.buckets[each.key].bucket}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "distribution" {
  for_each = local.buckets

  origin {
    domain_name              = aws_s3_bucket.buckets[each.key].bucket_regional_domain_name
    origin_id                = aws_s3_bucket.buckets[each.key].bucket
    origin_access_control_id = aws_cloudfront_origin_access_control.oac[each.key].id
  }

  comment             = local.cloudfront_comments[each.key]
  enabled             = true
  is_ipv6_enabled     = false
  http_version        = "http2"
  default_root_object = each.value.key
  price_class         = var.cloudfront_price_class

  aliases = concat([aws_s3_bucket.buckets[each.key].bucket], var.cloudfront_alias)

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    cache_policy_id  = "658327ea-f89d-4fab-a63d-7e88639e58f6" # Managed-CachingOptimized
    target_origin_id = aws_s3_bucket.buckets[each.key].bucket

    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.environment == "dev" ? aws_acm_certificate_validation.validation[0].certificate_arn : data.aws_acm_certificate.cert[0].arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  dynamic "custom_error_response" {
    for_each = local.cloudfront_error_response
    content {
      error_code            = custom_error_response.value
      error_caching_min_ttl = 10
      response_code         = 200
      response_page_path    = "/index.html"
    }
  }

  tags = local.common_tags

  depends_on = [aws_s3_bucket_website_configuration.configs]
}