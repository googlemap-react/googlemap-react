#!/bin/sh

yarn build:lib && \
mv ./packages/lib/dist ./examples/CRA/src/lib/ && \
cd examples/CRA && \
cp .env.sample .env
sed 's@YOUR GOOGLE MAP API KEY@'${GOOGLE_API_KEY}'@' -i .env
yarn build && \
cp now.json build && \
cd build && \
now --token $NOW_TOKEN && \
now alias --token $NOW_TOKEN && \
now remove map-example-CRA --safe -y --token $NOW_TOKEN && \
cd ../../../packages/lib && \
yarn styleguide:build && \
cp now.json styleguide && \
cd styleguide && \
now --token $NOW_TOKEN && \
now alias --token $NOW_TOKEN && \
now remove react-google-map --safe -y --token $NOW_TOKEN