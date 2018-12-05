#!/usr/bin/env bash
pm2 stop gxb-explorer
SYNC=1 NODE_ENV=production pm2 start server-dist/index.js --name gxb-explorer
