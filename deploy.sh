#!/bin/sh

yarn build:lib && \
cd examples/CRA && \
cp .env.sample .env
sed 's@YOUR GOOGLE MAP API KEY@'${GOOGLE_API_KEY}'@' -i .env
yarn build && \
cp vercel.json build && \
cd build && \
vercel --prod --token $NOW_TOKEN --yes && \
cd ../../../packages/lib && \
yarn styleguide:build && \
cp vercel.json styleguide && \
cd styleguide && \
vercel --prod --token $NOW_TOKEN --yes