@echo off
echo Stopping any running node processes...
taskkill /F /IM node.exe 2>nul

echo Testing MongoDB connection...
node test-db.js
if %errorlevel% neq 0 (
    echo Failed to connect to MongoDB. Please make sure MongoDB is running.
    exit /b 1
)

echo Starting server...
npm start
