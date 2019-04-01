#!/usr/bin/env bash
pm2 stop gxb-explorer
NODE_ENV=production pm2 start server-dist/index.js --name gxb-explorer
