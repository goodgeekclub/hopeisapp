#!/bin/bash
unset $AWS_SESSION_TOKEN
ROLE_ARN="arn:aws:iam::907877978309:role/hopeisapp-federated-role-dev"
TIME=3600
NAME="araiva"
AWS_CREDENTIAL=$(aws sts assume-role-with-web-identity \
    --role-arn "${ROLE_ARN}" \
    --role-session-name "${NAME}" \
    --web-identity-token "${FIREBASE_TOKEN}" \
    --duration-seconds ${TIME})
echo "${AWS_CREDENTIAL}"

export AWS_ACCESS_KEY_ID=$(jq -r '.Credentials.AccessKeyId' <<< "${AWS_CREDENTIAL}")
export AWS_SECRET_ACCESS_KEY=$(jq -r '.Credentials.SecretAccessKey' <<< ${AWS_CREDENTIAL})
export AWS_SESSION_TOKEN=$(jq -r '.Credentials.SessionToken' <<< ${AWS_CREDENTIAL})

echo "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}"
echo "AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}"
echo "AWS_SESSION_TOKEN=${AWS_SESSION_TOKEN}"

aws s3 ls s3://dev-media.hopeis.us

aws sts get-caller-identity