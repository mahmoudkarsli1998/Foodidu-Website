# Simple Website Tester
param([string]$Url = "https://www.foodidu.com/")

Write-Host "Testing website: $Url" -ForegroundColor Cyan

try {
    # Test basic connectivity
    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    $request = [System.Net.WebRequest]::Create($Url)
    $request.Timeout = 10000
    $response = $request.GetResponse()
    $stopwatch.Stop()
    
    $loadTime = $stopwatch.ElapsedMilliseconds
    $status = $response.StatusCode
    $contentLength = $response.ContentLength
    
    $response.Close()
    
    Write-Host "Results:" -ForegroundColor Yellow
    Write-Host "  Load Time: $loadTime ms" -ForegroundColor White
    Write-Host "  HTTP Status: $status" -ForegroundColor White
    Write-Host "  Content Length: $contentLength bytes" -ForegroundColor White
    
    # Simple scoring
    $score = 100
    if ($loadTime -gt 3000) { $score -= 30 }
    elseif ($loadTime -gt 1500) { $score -= 15 }
    
    Write-Host "  Performance Score: $score/100" -ForegroundColor $(if($score -ge 80){"Green"}elseif($score -ge 60){"Yellow"}else{"Red"})
    
    # Test ping
    $uri = [System.Uri]$Url
    $pingResult = Test-Connection -ComputerName $uri.Host -Count 2 -ErrorAction SilentlyContinue
    if ($pingResult) {
        $avgPing = ($pingResult | Measure-Object -Property ResponseTime -Average).Average
        Write-Host "  Average Ping: $([math]::Round($avgPing)) ms" -ForegroundColor White
    }
    
    Write-Host "`nAnalysis completed successfully!" -ForegroundColor Green
    
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}