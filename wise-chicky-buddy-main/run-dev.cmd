@echo off
setlocal
cd /d "%~dp0"
node scripts\dev-server.mjs --host 127.0.0.1 --port 5173
