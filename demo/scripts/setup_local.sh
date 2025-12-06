#!/usr/bin/env bash
export DOCKER_DEFAULT_PLATFORM=linux/amd64

git submodule init --recursive
set -xe
make -C lib/breez_sdk_liquid/packages/wasm init build-web --ignore-errors
. lib/breez_sdk_liquid/regtest/start.sh
