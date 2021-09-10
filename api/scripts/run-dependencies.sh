#!/usr/bin/env bash

set -e

docker run --rm -p 6379:6379 -d redis redis-server --appendonly yes

