#!/bin/bash
echo "Installing dependencies..."
npm install

echo "Building React app..."
npm run build

echo "Starting server..."
npx serve -s build -l 8080 -n
