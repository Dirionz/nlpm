#!/bin/bash
set -ev
npm test
if [ "${TRAVIS_BRANCH}" = "master" ]; then
    docker run --user user $DOCKER_USERNAME/nlpm:ubuntu /bin/bash -c "source ~/.nvm/nvm.sh; cd /home/user/nlpm; ./src/nlpm.js restore;"
    docker run --user user $DOCKER_USERNAME/nlpm:arch /bin/bash -c "source ~/.nvm/nvm.sh; cd /home/user/nlpm; ./src/nlpm.js restore;"
fi
