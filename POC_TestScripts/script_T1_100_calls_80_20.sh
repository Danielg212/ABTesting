#!/bin/bash

age=20  # Starting age
endpoint='localhost:8080/getTest'  # API endpoint

for (( i=1; i<=100; i++ )); do
  data='{ "age": '$age', "name": "moshe", "favorite_animal": "cat" }'
  curl --location "$endpoint" \
       --header 'Content-Type: application/json' \
       --data "$data"
  age=$((age+1)) # Increment age for the next call
done
