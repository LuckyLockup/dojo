#!/usr/bin/env bash

echo "Pulling latest changes..."
git pull
echo "Building prod..."
npm install --save
npm run build
echo "Cp to nginx folder..."
cp -a build/. /var/www/html
