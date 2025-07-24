#!/bin/bash
export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v18.20.4/bin

cd /home/ubuntu/offchain-orderbook
git pull origin master
npm run build
pm2 stop client
pm2 start npm --name "client" -- run "start:client"