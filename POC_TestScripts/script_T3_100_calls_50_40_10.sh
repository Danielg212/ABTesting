#!/bin/bash

age=9  # Starting age
endpoint='localhost:8080/getTest'  # API endpoint
nameLength=8  # Length of the random name

for (( i=1; i<=100; i++ )); do
  data='{ "age": 9, "name": "'$i'", "favorite_animal": "cat" }'
  curl --location "$endpoint" \
       --header 'Content-Type: application/json' \
       --data "$data"
done
