@echo off
chcp 65001 >nul
title Perry Desktop
cd /d "%~dp0"

echo ========================================
echo   Perry — Desktop (Vite)
echo   http://localhost:3000
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

echo Запуск Vite...
call npm run dev

echo.
pause
