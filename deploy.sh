#!/bin/sh

yarn build:lib && \
cd examples/CRA && \
cp .env.sample .env
sed 's@YOUR GOOGLE MAP API KEY@'${GOOGLE_API_KEY}'@' -i .env
yarn build && \
cp vercel.json build && \
cd build && \
vercel --prod --token $NOW_TOKEN --confirm && \
cd ../../../packages/lib && \
mv tsconfig.json tsconfig.noemit.json && \
mv tsconfig.emit.json tsconfig.json && \
yarn styleguide:build && \
cp vercel.json styleguide && \
cd styleguide && \
vercel --prod --token $NOW_TOKEN --confirm