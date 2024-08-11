CLOUDFRONT_ID=E1C1EK3OEXV5UD
INVALIDATION_ID="I2I0J4VV9Y1POMFE5KBWU6ZTU0"
INVALIDATION_STATUS=Inprogress
while [ $INVALIDATION_STATUS != "Completed" ]
do
  INVALIDATION=$(aws cloudfront get-invalidation --id $INVALIDATION_ID --distribution-id $CLOUDFRONT_ID)
  INVALIDATION_STATUS=$(echo "$INVALIDATION" | jq -r '.Invalidation.Status')
  echo "INVALIDATION_STATUS:" "$INVALIDATION_STATUS" | cat -e
  if [ $INVALIDATION_STATUS != "Completed" ]; then
    sleep 15
  fi;
done
echo "FINISH"