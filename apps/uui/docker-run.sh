#!/usr/bin/env bash

docker run -p 3000:3000 -e UUI_ENV=local NODE_ENV=local -e BABEL_ENV=local -e SSO_ISSUER=changeme squirmlabs/uui