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
      key  = "asset.html"
    }
    web = {
      name = var.environment == "prod" ? "www.${local.domain_name}" : "${var.environment}.${local.domain_name}"
      key  = "index.html"
    }
  }

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