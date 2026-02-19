@echo off
echo Removing git lock file...
cd /d "%~dp0"
if exist ".git\index.lock" (
    del /f /q ".git\index.lock"
    echo Lock file removed.
)

echo.
echo Adding all files...
git add .

echo.
echo Committing changes...
git commit -m "Initial commit: Book Management System with Angular frontend and ASP.NET backend"

echo.
echo Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo Done! Check your GitHub repository.
pause
