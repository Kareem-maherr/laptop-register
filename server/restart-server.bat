@echo off
echo Stopping any running node processes...
taskkill /F /IM node.exe

echo Installing dependencies...
call npm install

echo Starting server...
call npm start
