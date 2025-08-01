@echo off
echo Portfolio Website Test Suite
echo ===========================
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo.
    echo Alternative: Open test.html in your browser for basic tests
    pause
    exit /b 1
)

echo Node.js found! Running tests...
echo.

REM Run the Node.js test suite
node test.js

echo.
echo ===========================
echo Test complete!
echo.
echo Additional options:
echo 1. Open test.html in your browser for interactive tests
echo 2. Run 'npm run test-server' to start a local test server
echo.
pause
