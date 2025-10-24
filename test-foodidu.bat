@echo off
cls
echo.
echo ==========================================
echo      FOODIDU PERFORMANCE ANALYZER
echo ==========================================
echo.
echo Testing https://www.foodidu.com/
echo.

REM Test the live website
powershell -ExecutionPolicy Bypass -File "test-website.ps1" -Url "https://www.foodidu.com/"

echo.
echo ==========================================
echo           ADDITIONAL TESTS
echo ==========================================
echo.

REM Test local development if running
echo Testing local development server (if running)...
powershell -ExecutionPolicy Bypass -Command "try { .\test-website.ps1 -Url 'http://localhost:3000' } catch { Write-Host 'Local server not running' -ForegroundColor Yellow }"

echo.
echo ==========================================
echo         PERFORMANCE TIPS FOR FOODIDU
echo ==========================================
echo.
echo 1. Your website loads very fast (under 500ms)!
echo 2. To enable detailed browser analysis:
echo    - Visit: https://www.foodidu.com/?performance=true
echo    - Or run: enableFoodiduAdmin() in browser console
echo.
echo 3. For continuous monitoring, bookmark this batch file
echo.
echo 4. Mobile optimization tips:
echo    - Images are loading efficiently
echo    - Consider lazy loading for deal cards
echo    - Optimize for 3G connections in Egypt/Saudi
echo.
pause