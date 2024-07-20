locals {
  aws_account_id = "907877978309"
  project_name   = "hopeisapp"
  domain_name    = "hopeis.us"
  common_tags = {
    project-name = local.project_name
  }
}
locals {
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
    asset = "${local.project_name}-asset-${var.environment}"
    web   = "${local.project_name}-website-${var.environment}"
  }

  cloudfront_error_response = [400, 403, 404, 405, 500, 502, 503, 504]

}