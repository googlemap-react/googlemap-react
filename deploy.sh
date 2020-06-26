#!/bin/sh

yarn build:lib && \
cd examples/CRA && \
cp .env.sample .env
sed 's@YOUR GOOGLE MAP API KEY@'${GOOGLE_API_KEY}'@' -i .env
yarn build && \
cp now.json build && \
cd build && \
now --prod --token $NOW_TOKEN --yes && \
cd ../../../packages/lib && \
yarn styleguide:build && \
cp now.json styleguide && \
cd styleguide && \
now --prod --token $NOW_TOKEN --yes