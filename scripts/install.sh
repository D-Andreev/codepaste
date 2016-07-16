#!/usr/bin/env bash

nohup APP_URL=http://162.243.123.212:666 APP_ENV=production APP_PORT=666 node ./node_modules/nodemon/bin/nodemon ./ localhost 666
