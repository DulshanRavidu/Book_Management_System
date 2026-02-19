@echo off
echo Starting Backend API Server...
cd /d "%~dp0backend\BookManagement.Api"
dotnet run
pause
