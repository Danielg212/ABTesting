#!/bin/bash

endpoint='localhost:8080/getTest'  # API endpoint

for (( i=1; i<=100; i++ )); do
  data='{ "age": 10, "name": "Israel", "favorite_animal": "parrot" }'
  curl --location "$endpoint" \
       --header 'Content-Type: application/json' \
       --data "$data"
done
