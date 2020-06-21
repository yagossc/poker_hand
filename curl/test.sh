#!/bin/sh

curl -X POST -i -H "Content-Type: application/json" \
     -H "Accept: application/json"                  \
     http://192.168.8.2:8080/                       \
     -d '{"h1":"2c 2d 2h 6s 5h", "h2":"3c 3d 3s 4h 5c"}'

curl -X POST -i -H "Content-Type: application/json" \
     -H "Accept: application/json"                  \
     http://192.168.8.2:8080/                       \
     -d '{"h1":"2c 2d 2h 2h 5h", "h2":"3c 3d 3s 4h 5c"}'

curl -X POST -i -H "Content-Type: application/json" \
     -H "Accept: application/json"                  \
     http://192.168.8.2:8080/                       \
     -d '{"h1":"2c 2d 2h 7c 5h", "h2":"3c 3d 3s 2c 5c"}'
