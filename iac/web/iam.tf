########################
# Federated
########################
data "aws_iam_policy_document" "role_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = ["arn:aws:iam::${local.aws_account_id}:oidc-provider/securetoken.google.com/${local.project_name}"]
    }
    condition {
      test     = "StringEquals"
      variable = "securetoken.google.com/${local.project_name}:aud"
      values = [
        "${local.project_name}"
      ]
    }
  }
}

resource "aws_iam_role" "federate_role" {
  name               = "${local.project_name}-federated-role-${var.environment}"
  assume_role_policy = data.aws_iam_policy_document.role_assume_role_policy.json

  inline_policy {
    name = "hopisapp-s3-fullaccess"
    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Sid    = "Statement0"
          Effect = "Allow"
          Action = [
            "s3:ListAllMyBuckets"
          ]
          Resource = ["*"]
        },
        {
          Sid    = "Statement1"
          Effect = "Allow"
          Action = [
            "s3:ListBucket"
          ]
          Resource = [
            "arn:aws:s3:::*${local.project_name}-*",
            "arn:aws:s3:::${local.buckets.asset.name}"
          ]
        },
        {
          Sid    = "Statement2"
          Effect = "Allow"
          Action = [
            "s3:ListBucket",
            "s3:GetObject",
            "s3:PutObject",
            "s3:DeleteObject"
          ]
          Resource = [
            "arn:aws:s3:::*${local.project_name}-*/*",
            "arn:aws:s3:::${local.buckets.asset.name}/*"
          ]
        }
      ]
    })
  }
}

########################
# DataDog
########################
data "aws_iam_policy_document" "datadog_trust_policy" {
  count = var.environment == "prod" ? 1 : 0
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::417141415827:root"] # DataDog Account ID AP1
    }
    condition {
      test     = "StringEquals"
      variable = "sts:ExternalId"
      values = [
        "33125d070f0a4595a6afb5ef3c97170d" # Datadog External ID
      ]
    }
  }
}

resource "aws_iam_role" "datadog_role" {
  count              = var.environment == "prod" ? 1 : 0
  name               = "${local.project_name}-datadog-role"
  description        = "Allow DataDog access to hopeisapp production environment only."
  assume_role_policy = data.aws_iam_policy_document.datadog_trust_policy[0].json

  inline_policy {
    name = "${local.project_name}-datadog-integration-policy"

    policy = file("../backend/policy/iam-datadog-policy.json")
  }

  tags = local.common_tags
}
