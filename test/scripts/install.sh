#!/bin/bash
set -ev
if [ "${TRAVIS_BRANCH}" = "master" ]; then
  docker build . -t nlpm:ubuntu -f test/docker/ubuntu/Dockerfile
  docker build . -t nlpm:arch -f test/docker/arch/Dockerfile
fi
