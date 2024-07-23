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
