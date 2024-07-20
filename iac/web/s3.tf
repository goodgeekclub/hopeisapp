#########################
# Bucket
#########################
resource "aws_s3_bucket" "buckets" {
  for_each = local.buckets

  bucket = each.value.name
  tags   = local.common_tags
}

resource "aws_s3_object" "objects" {
  for_each = local.buckets

  bucket       = aws_s3_bucket.buckets[each.key].bucket
  key          = each.value.key
  source       = each.value.src
  content_type = "text/html"
  etag         = filemd5(each.value.src)
  tags         = local.common_tags
}

resource "aws_s3_bucket_website_configuration" "configs" {
  for_each = local.buckets

  bucket = aws_s3_bucket.buckets[each.key].id

  index_document {
    suffix = each.value.key
  }
}

#########################
# Bucket Policy
#########################
data "aws_iam_policy_document" "allow_access" {
  for_each = local.buckets

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
      "${aws_s3_bucket.buckets[each.key].arn}/*",
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [ aws_cloudfront_distribution.distribution[each.key].arn ]
    }
  }
}

resource "aws_s3_bucket_policy" "allow_access" {
  for_each = local.buckets

  bucket = aws_s3_bucket.buckets[each.key].id
  policy = data.aws_iam_policy_document.allow_access[each.key].json
}