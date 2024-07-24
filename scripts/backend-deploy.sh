#!/bin/bash
cd backend
npm install
npx serverless deploy --stage $ENVIRONMENT