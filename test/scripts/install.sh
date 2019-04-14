#!/bin/bash
set -ev
if [ "${TRAVIS_BRANCH}" = "master" ]; then
  docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"
  docker build . -t $DOCKER_USERNAME/nlpm:ubuntu -f test/docker/ubuntu/Dockerfile
  docker push $DOCKER_USERNAME/nlpm:ubuntu;
  #docker build . -t $DOCKER_USERNAME/nlpm:arch -f test/docker/arch/Dockerfile
  #docker push $DOCKER_USERNAME/nlpm:arch;
fi
