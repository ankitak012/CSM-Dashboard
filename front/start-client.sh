#!/bin/bash

# Build the application without SSR
ng build --configuration production

# Serve the application using a simple HTTP server
npx http-server dist/dashboard -p 4200 