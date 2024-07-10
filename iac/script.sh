#!/bin/bash
terraform init -backend-config=environments/dev/.env.backendconfig
terraform plan -var-file=environments/dev/terraform.tfvars
terraform apply -auto-approve -var-file=environments/dev/terraform.tfvars
