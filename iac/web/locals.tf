locals {
  aws_account_id = "907877978309"
  project_name   = "hopeisapp"
  domain_name    = "hopeis.us"
}

locals {
  common_tags = {
    project-name = local.project_name
  }

  buckets = {
    asset = {
      name = var.environment == "prod" ? "media.${local.domain_name}" : "${var.environment}-media.${local.domain_name}"
      key  = "index.html"
    }
    web = {
      name = var.environment == "prod" ? "www.${local.domain_name}" : "${var.environment}.${local.domain_name}"
      key  = "index.html"
    }
  }

  common_origins = [
    "http://${aws_s3_bucket_website_configuration.configs["web"].website_endpoint}"
  ]

  dev_origins = [
    "http://localhost:4200",
    "http://localhost:3000",
    "https://${local.buckets.asset.name}"
  ]

  allowed_origins = var.environment == "dev" ? concat(local.dev_origins, local.common_origins) : local.common_origins

  cloudfront_comments = {
    asset = "${local.project_name}-asset-${var.environment}"
    web   = "${local.project_name}-website-${var.environment}"
  }

  cloudfront_error_response = [400, 403, 404, 405, 500, 502, 503, 504]

  route53_records = {
    asset = {
      name = var.environment == "prod" ? "media" : "${var.environment}-media"
      distribution = aws_cloudfront_distribution.distribution["asset"]
      create = true
    }
    web = {
      name = var.environment == "prod" ? "www" : var.environment
      distribution = aws_cloudfront_distribution.distribution["web"]
      create = true
    }
    root = {
      name = ""
      distribution = aws_cloudfront_distribution.distribution["web"]
      create = var.environment == "prod" ? true : false
    }
  }

}