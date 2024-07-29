#########################
# Bucket
#########################
resource "aws_s3_bucket" "buckets" {
  for_each = local.buckets

  bucket = each.value.name
  tags   = local.common_tags
}

resource "aws_s3_bucket_website_configuration" "configs" {
  for_each = local.buckets

  bucket = aws_s3_bucket.buckets[each.key].id

  index_document {
    suffix = each.value.key
  }

  error_document {
    key = each.value.key
  }
}

#########################
# Bucket Policy
#########################
data "aws_iam_policy_document" "allow_access_web" {
  statement {
    sid = "CloudFrontGetObject"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${aws_s3_bucket.buckets["web"].arn}/*",
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [ aws_cloudfront_distribution.distribution["web"].arn ]
    }
  }

  statement {
    sid = "PublicGet"

    principals {
      type        = "*"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${aws_s3_bucket.buckets["web"].arn}/*",
    ]
  }
}

data "aws_iam_policy_document" "allow_access_asset" {
  statement {
    sid = "CloudFrontGetObject"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${aws_s3_bucket.buckets["asset"].arn}/*",
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [ aws_cloudfront_distribution.distribution["asset"].arn ]
    }
  }
}

resource "aws_s3_bucket_policy" "allow_access" {
  for_each = local.buckets

  bucket = aws_s3_bucket.buckets[each.key].id
  policy = each.key == "web" ? data.aws_iam_policy_document.allow_access_web.json : data.aws_iam_policy_document.allow_access_asset.json
}

resource "aws_s3_bucket_cors_configuration" "asset_bucket" {
  bucket = aws_s3_bucket.buckets["asset"].id

  cors_rule {
    allowed_headers = ["*", "Authorization"]
    allowed_methods = ["HEAD", "PUT", "POST", "DELETE"]
    allowed_origins = [
      "http://localhost:4200",
      "http://localhost:3000",
      "https://${local.buckets.asset.name}",
      "http://${aws_s3_bucket_website_configuration.configs["web"].website_endpoint}"
    ]
    expose_headers  = ["ETag", "Access-Control-Allow-Origin"]
    max_age_seconds = 3000
  }

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
  }
}