terraform {
  backend "s3" {}
  required_providers {
    mongodbatlas = {
      source = "mongodb/mongodbatlas"
      version = "1.17.3"
    }
  }
}

provider "mongodbatlas" {}

locals {
  project_name = "hopeis"
  cluster_name = "app"
}

data "mongodbatlas_project" "this" {
  name = local.project_name
}

resource "mongodbatlas_serverless_instance" "name" {
  count = var.environment == "prod" ? 1 : 0

  project_id = data.mongodbatlas_project.this.id
  name = "${local.cluster_name}-${var.environment}"

  provider_settings_backing_provider_name = "AWS"
  provider_settings_provider_name         = "SERVERLESS"
  provider_settings_region_name           = "AP_SOUTHEAST_1"

  tags {
    key = "environment"
    value = var.environment
  }
}

output "environment" {
  value = var.environment
}