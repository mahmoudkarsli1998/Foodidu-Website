@echo off
echo.
echo ========================================
echo   Website Performance Analyzer
echo ========================================
echo.

REM Check if URL was provided as argument
if "%1"=="" (
    set /p url="Enter website URL to analyze: "
) else (
    set url=%1
)

echo.
echo Starting analysis for: %url%
echo.

REM Run PowerShell script
powershell -ExecutionPolicy Bypass -File "website-performance-analyzer.ps1" -Url "%url%" -Verbose -OpenReport

echo.
echo Analysis complete! Check the generated report.
pause