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
      type        = "*"
      identifiers = ["arn:aws:iam::464622532012:root"] # DataDog Account ID
    }
    condition {
      test     = "StringEquals"
      variable = "sts:ExternalId"
      values = [
        "b0d8dc0bcf194fb49d5b6d59d24935b0" # Datadog External ID
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

    policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
        {
          Action = [
            "apigateway:GET",
            "autoscaling:Describe*",
            "backup:List*",
            "budgets:ViewBudget",
            "cloudfront:GetDistributionConfig",
            "cloudfront:ListDistributions",
            "cloudtrail:DescribeTrails",
            "cloudtrail:GetTrailStatus",
            "cloudtrail:LookupEvents",
            "cloudwatch:Describe*",
            "cloudwatch:Get*",
            "cloudwatch:List*",
            "codedeploy:List*",
            "codedeploy:BatchGet*",
            "directconnect:Describe*",
            "dynamodb:List*",
            "dynamodb:Describe*",
            "ec2:Describe*",
            "ec2:GetTransitGatewayPrefixListReferences",
            "ec2:SearchTransitGatewayRoutes",
            "ecs:Describe*",
            "ecs:List*",
            "elasticache:Describe*",
            "elasticache:List*",
            "elasticfilesystem:DescribeFileSystems",
            "elasticfilesystem:DescribeTags",
            "elasticfilesystem:DescribeAccessPoints",
            "elasticloadbalancing:Describe*",
            "elasticmapreduce:List*",
            "elasticmapreduce:Describe*",
            "es:ListTags",
            "es:ListDomainNames",
            "es:DescribeElasticsearchDomains",
            "events:CreateEventBus",
            "fsx:DescribeFileSystems",
            "fsx:ListTagsForResource",
            "health:DescribeEvents",
            "health:DescribeEventDetails",
            "health:DescribeAffectedEntities",
            "kinesis:List*",
            "kinesis:Describe*",
            "lambda:GetPolicy",
            "lambda:List*",
            "logs:DeleteSubscriptionFilter",
            "logs:DescribeLogGroups",
            "logs:DescribeLogStreams",
            "logs:DescribeSubscriptionFilters",
            "logs:FilterLogEvents",
            "logs:PutSubscriptionFilter",
            "logs:TestMetricFilter",
            "organizations:Describe*",
            "organizations:List*",
            "rds:Describe*",
            "rds:List*",
            "redshift:DescribeClusters",
            "redshift:DescribeLoggingStatus",
            "route53:List*",
            "s3:GetBucketLogging",
            "s3:GetBucketLocation",
            "s3:GetBucketNotification",
            "s3:GetBucketTagging",
            "s3:ListAllMyBuckets",
            "s3:PutBucketNotification",
            "ses:Get*",
            "sns:List*",
            "sns:Publish",
            "sqs:ListQueues",
            "states:ListStateMachines",
            "states:DescribeStateMachine",
            "support:DescribeTrustedAdvisor*",
            "support:RefreshTrustedAdvisorCheck",
            "tag:GetResources",
            "tag:GetTagKeys",
            "tag:GetTagValues",
            "xray:BatchGetTraces",
            "xray:GetTraceSummaries"
          ],
          Effect   = "Allow",
          Resource = "*",
          "Condition" : {
            "StringEquals" : {
              "aws:RequestedRegion" : "ap-southeast-1"
            }
          }
        },
      ]
    })
  }

  tags = local.common_tags
}
