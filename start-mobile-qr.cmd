@echo off
chcp 65001 >nul
title Perry Mobile (Expo Go / QR)
cd /d "%~dp0mobile"

echo ========================================
echo   Perry — Mobile (Expo Go + QR)
echo   Телефон и ПК в одной Wi-Fi сети
echo ========================================
echo.
echo 1) Установи Expo Go на телефон
echo 2) Отсканируй QR в терминале
echo 3) Product API должен быть на :5272
echo    и доступен по LAN (см. mobile\.env)
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

echo Запуск Expo (LAN, QR)...
call npx expo start --lan --clear

echo.
pause
