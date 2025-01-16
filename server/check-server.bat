@echo off
echo Checking if server is running...
netstat -ano | findstr ":5000" > nul
if %errorlevel% equ 0 (
    echo Server is already running on port 5000
) else (
    echo Server is not running. Starting server...
    echo Installing dependencies...
    call npm install
    echo Starting server...
    start /B npm start
    timeout /t 5
    echo Server should now be running
)
