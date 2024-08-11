#!/bin/bash
terraform init -backend-config=environments/dev/.env.backendconfig -reconfigure
terraform plan -var-file=environments/dev/terraform.tfvars
terraform apply -auto-approve -var-file=environments/dev/terraform.tfvars

terraform init -backend-config=environments/uat/.env.backendconfig -reconfigure
terraform plan -var-file=environments/uat/terraform.tfvars
terraform apply -auto-approve -var-file=environments/uat/terraform.tfvars

terraform init -backend-config=environments/prod/.env.backendconfig -reconfigure
terraform plan -var-file=environments/prod/terraform.tfvars
terraform apply -auto-approve -var-file=environments/prod/terraform.tfvars