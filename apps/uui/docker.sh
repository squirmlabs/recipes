#!/usr/bin/env bash

docker build -t squirmlabs/uui .

docker tag squirmlabs/path.toamazonaws.com/squirmlabs/uui:dev

docker push path.to.amazonaws.com/squirmlabs/uui:dev