# Simple Website Performance Analyzer
param(
    [Parameter(Mandatory=$false)]
    [string]$Url = "",
    
    [Parameter(Mandatory=$false)]
    [switch]$ShowDetails
)

function Write-ColorOutput($ForegroundColor, $Message) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    Write-Output $Message
    $host.UI.RawUI.ForegroundColor = $fc
}

function Test-WebsitePerformance {
    param([string]$TargetUrl)
    
    Write-ColorOutput Cyan "Starting website performance analysis..."
    Write-ColorOutput Cyan "Target: $TargetUrl"
    Write-Output ""
    
    $results = @{
        url = $TargetUrl
        timestamp = Get-Date -Format 'yyyy-MM-ddTHH:mm:ss.fffZ'
        loadTime = 0
        httpStatus = 0
        contentLength = 0
        pingAverage = 0
        suggestions = @()
        score = 0
    }
    
    try {
        # Test load time
        Write-ColorOutput Yellow "Testing load time..."
        $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
        
        $request = [System.Net.WebRequest]::Create($TargetUrl)
        $request.Method = "GET"
        $request.Timeout = 30000
        $request.UserAgent = "Simple-Website-Analyzer/1.0"
        
        $response = $request.GetResponse()
        $stopwatch.Stop()
        
        $results.loadTime = $stopwatch.ElapsedMilliseconds
        $results.httpStatus = [int]$response.StatusCode
        $results.contentLength = $response.ContentLength
        
        $response.Close()
        
        if ($ShowDetails) {
            Write-Output "  Load Time: $($results.loadTime)ms"
            Write-Output "  HTTP Status: $($results.httpStatus)"
            Write-Output "  Content Length: $($results.contentLength) bytes"
        }
        
        # Test ping
        Write-ColorOutput Yellow "Testing ping..."
        $uri = [System.Uri]$TargetUrl
        $hostname = $uri.Host
        
        $pingResults = Test-Connection -ComputerName $hostname -Count 4 -ErrorAction SilentlyContinue
        if ($pingResults) {
            $results.pingAverage = ($pingResults | Measure-Object -Property ResponseTime -Average).Average
            if ($ShowDetails) {
                Write-Output "  Average Ping: $([math]::Round($results.pingAverage))ms"
            }
        }
        
        # Generate suggestions
        $suggestions = @()
        
        if ($results.loadTime -gt 3000) {
            $suggestions += "HIGH: Slow page load time ($($results.loadTime)ms). Optimize server response time and enable caching."
        } elseif ($results.loadTime -gt 1500) {
            $suggestions += "MEDIUM: Moderate page load time ($($results.loadTime)ms). Consider optimizing images and enabling compression."
        }
        
        if ($results.pingAverage -gt 200) {
            $suggestions += "MEDIUM: High network latency ($([math]::Round($results.pingAverage))ms). Consider using a CDN."
        }
        
        if ($results.contentLength -gt 2097152) {  # 2MB
            $suggestions += "MEDIUM: Large content size ($([math]::Round($results.contentLength / 1024 / 1024, 2)) MB). Enable compression and optimize resources."
        }
        
        $results.suggestions = $suggestions
        
        # Calculate score
        $score = 100
        if ($results.loadTime -gt 5000) { $score -= 30 }
        elseif ($results.loadTime -gt 3000) { $score -= 20 }
        elseif ($results.loadTime -gt 1500) { $score -= 10 }
        
        if ($results.pingAverage -gt 300) { $score -= 15 }
        elseif ($results.pingAverage -gt 200) { $score -= 10 }
        
        $score -= ($suggestions.Count * 5)
        $results.score = [math]::Max(0, $score)
        
        return $results
        
    } catch {
        Write-ColorOutput Red "Analysis failed: $($_.Exception.Message)"
        throw
    }
}

function Show-Results {
    param([hashtable]$Results)
    
    Write-Output ""
    Write-ColorOutput Cyan "PERFORMANCE ANALYSIS REPORT"
    Write-ColorOutput Cyan "================================"
    Write-Output ""
    
    # Overall Score
    $scoreColor = if ($Results.score -ge 80) { "Green" } elseif ($Results.score -ge 60) { "Yellow" } else { "Red" }
    Write-Output "Overall Performance Score: " -NoNewline
    Write-ColorOutput $scoreColor "$($Results.score)/100"
    Write-Output ""
    
    # Metrics
    Write-ColorOutput Yellow "Performance Metrics:"
    Write-Output "   Load Time: $($Results.loadTime)ms"
    Write-Output "   HTTP Status: $($Results.httpStatus)"
    Write-Output "   Content Size: $([math]::Round($Results.contentLength / 1024, 2)) KB"
    Write-Output "   Average Ping: $([math]::Round($Results.pingAverage))ms"
    Write-Output ""
    
    # Suggestions
    if ($Results.suggestions.Count -gt 0) {
        Write-ColorOutput Yellow "Optimization Suggestions:"
        foreach ($suggestion in $Results.suggestions) {
            Write-Output "   $suggestion"
        }
    } else {
        Write-ColorOutput Green "No major performance issues detected!"
    }
    
    Write-Output ""
}

# Main execution
Write-ColorOutput Cyan "Simple Website Performance Analyzer"
Write-ColorOutput Cyan "======================================"
Write-Output ""

$targetUrl = $Url
if (-not $targetUrl) {
    $targetUrl = Read-Host "Enter website URL to analyze (e.g., https://example.com)"
}

if (-not $targetUrl.StartsWith("http://") -and -not $targetUrl.StartsWith("https://")) {
    $targetUrl = "https://" + $targetUrl
}

try {
    $results = Test-WebsitePerformance -TargetUrl $targetUrl
    Show-Results -Results $results
    
    # Save results
    $jsonReport = $results | ConvertTo-Json -Depth 10
    $reportFile = "performance-report-$(Get-Date -Format 'yyyy-MM-dd-HHmm').json"
    $jsonReport | Out-File -FilePath $reportFile -Encoding UTF8
    
    Write-Output ""
    Write-ColorOutput Green "Analysis completed successfully!"
    Write-ColorOutput Cyan "Report saved to: $reportFile"
    
} catch {
    Write-ColorOutput Red "Analysis failed: $($_.Exception.Message)"
    exit 1
}