#!/usr/bin/env sh
cd "$(dirname "$0")" || exit 1
node scripts/dev-server.mjs --host 127.0.0.1 --port 5173
