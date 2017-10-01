#!/bin/bash
set -ev
npm test
if [ "${TRAVIS_BRANCH}" = "master" ]; then
    docker run --user user nlpm:ubuntu /bin/bash -c "source ~/.nvm/nvm.sh; cd /home/user/nlpm; ./app.js install;"
    docker run --user user nlpm:arch /bin/bash -c "source ~/.nvm/nvm.sh; cd /home/user/nlpm; ./app.js install;"
fi
