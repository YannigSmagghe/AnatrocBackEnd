#!/usr/bin/env bash

sed -i "s|%API_URL%|$API_URL|" index.html
npm i
node_modules/.bin/gulp
node_modules/.bin/gulp watch