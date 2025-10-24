@echo off
cls
echo.
echo ==========================================
echo    Website Performance Analysis Suite
echo ==========================================
echo.
echo Choose your analysis method:
echo.
echo 1. Test external website (PowerShell)
echo 2. Open JavaScript analyzer (Browser)
echo 3. Open test page (Browser demo)
echo 4. Exit
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto powershell_test
if "%choice%"=="2" goto browser_analyzer
if "%choice%"=="3" goto test_page
if "%choice%"=="4" goto exit
goto invalid

:powershell_test
echo.
set /p url="Enter website URL to test: "
echo.
echo Running PowerShell analysis...
powershell -ExecutionPolicy Bypass -File "test-website.ps1" -Url "%url%"
echo.
pause
goto menu

:browser_analyzer
echo.
echo Opening JavaScript performance analyzer...
start performance-diagnostics.html
goto menu

:test_page
echo.
echo Opening performance test page...
start test-performance.html
goto menu

:invalid
echo.
echo Invalid choice. Please try again.
pause
goto menu

:menu
cls
echo.
echo ==========================================
echo    Website Performance Analysis Suite
echo ==========================================
echo.
echo Choose your analysis method:
echo.
echo 1. Test external website (PowerShell)
echo 2. Open JavaScript analyzer (Browser)
echo 3. Open test page (Browser demo)
echo 4. Exit
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto powershell_test
if "%choice%"=="2" goto browser_analyzer
if "%choice%"=="3" goto test_page
if "%choice%"=="4" goto exit
goto invalid

:exit
echo.
echo Thanks for using the Performance Analysis Suite!
echo.
pause