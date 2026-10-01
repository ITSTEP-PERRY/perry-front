@echo off
chcp 65001 >nul
title Perry Mobile
cd /d "%~dp0mobile"

echo ========================================
echo   Perry — Mobile (Expo Web)
echo   http://localhost:8081
echo ========================================
echo.
echo Нужен Perry.Api на :5272 (Product).
echo.

if not exist "node_modules\" (
  echo [!] Нет node_modules — ставлю зависимости...
  call npm install
  if errorlevel 1 (
    echo Ошибка npm install
    pause
    exit /b 1
  )
)

set "TEMP=%~dp0.tmp"
set "TMP=%~dp0.tmp"
if not exist "%TEMP%" mkdir "%TEMP%"

echo Запуск Expo Web на порту 8081 (cache clear)...
call npx expo start --web --port 8081 --clear

echo.
pause
