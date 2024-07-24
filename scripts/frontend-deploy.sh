cd frontend
npm install
ng build
aws s3 sync dist/frontend s3://dev.hopeis.us