locals {
  project_name = "hopeis"
  domain_name  = "hopeis.us"
  common_tags = {
    project-name = local.project_name
  }

  buckets = {
    asset = {
      name = var.environment == "prod" ? "media.${local.domain_name}" : "${var.environment}-media.${local.domain_name}"
      key  = "asset.html"
      src  = "./src/asset.html"
    }
    web = {
      name = var.environment == "prod" ? "www.${local.domain_name}" : "${var.environment}.${local.domain_name}"
      key  = "index.html"
      src  = "./src/index.html"
    }
  }

  cloudfront_comments = {
    asset = "hopeis-asset-${var.environment}"
    web   = "hopeis-website-${var.environment}"
  }

}