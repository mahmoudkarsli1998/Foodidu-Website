# Foodidu Website Performance Analysis
# Specialized analysis for https://www.foodidu.com/

param(
    [Parameter(Mandatory=$false)]
    [switch]$Detailed,
    
    [Parameter(Mandatory=$false)]
    [switch]$SaveReport
)

$FoodiduUrl = "https://www.foodidu.com/"

function Write-ColorOutput($ForegroundColor, $Message) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    Write-Output $Message
    $host.UI.RawUI.ForegroundColor = $fc
}

function Test-FoodiduPerformance {
    Write-ColorOutput Cyan "🍽️  FOODIDU PERFORMANCE ANALYSIS"
    Write-ColorOutput Cyan "=================================="
    Write-Output ""
    Write-ColorOutput Yellow "Analyzing: $FoodiduUrl"
    Write-Output ""
    
    $results = @{
        url = $FoodiduUrl
        timestamp = Get-Date -Format 'yyyy-MM-ddTHH:mm:ss.fffZ'
        loadTime = 0
        httpStatus = ""
        contentLength = 0
        pingAverage = 0
        serverHeaders = @{}
        suggestions = @()
        score = 0
        analysis = @{
            loadTimeGrade = ""
            pingGrade = ""
            sizeGrade = ""
            overallGrade = ""
        }
    }
    
    try {
        # Test main page load time
        Write-ColorOutput Yellow "📡 Testing main page load time..."
        $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
        
        $request = [System.Net.WebRequest]::Create($FoodiduUrl)
        $request.Method = "GET"
        $request.Timeout = 15000
        $request.UserAgent = "Foodidu-Performance-Analyzer/1.0"
        
        $response = $request.GetResponse()
        $stopwatch.Stop()
        
        $results.loadTime = $stopwatch.ElapsedMilliseconds
        $results.httpStatus = $response.StatusCode
        $results.contentLength = $response.ContentLength
        
        # Capture server headers
        foreach ($header in $response.Headers.AllKeys) {
            $results.serverHeaders[$header] = $response.Headers[$header]
        }
        
        $response.Close()
        
        Write-Output "  ✅ Load Time: $($results.loadTime)ms"
        Write-Output "  ✅ HTTP Status: $($results.httpStatus)"
        Write-Output "  ✅ Content Length: $($results.contentLength) bytes"
        
        # Test network connectivity
        Write-ColorOutput Yellow "🌐 Testing network connectivity..."
        $uri = [System.Uri]$FoodiduUrl
        $hostname = $uri.Host
        
        $pingResults = Test-Connection -ComputerName $hostname -Count 4 -ErrorAction SilentlyContinue
        if ($pingResults) {
            $results.pingAverage = ($pingResults | Measure-Object -Property ResponseTime -Average).Average
            Write-Output "  ✅ Average Ping: $([math]::Round($results.pingAverage))ms"
            Write-Output "  ✅ Packet Loss: $(((4 - $pingResults.Count) / 4) * 100)%"
        }
        
        # Analyze server configuration
        Write-ColorOutput Yellow "🔧 Analyzing server configuration..."
        $compressionEnabled = $results.serverHeaders.ContainsKey("Content-Encoding")
        $cacheControlPresent = $results.serverHeaders.ContainsKey("Cache-Control")
        $serverType = $results.serverHeaders["Server"]
        
        Write-Output "  Server: $($serverType -or 'Not disclosed')"
        Write-Output "  Compression: $(if($compressionEnabled){'✅ Enabled'}else{'❌ Not detected'})"
        Write-Output "  Cache Control: $(if($cacheControlPresent){'✅ Present'}else{'❌ Missing'})"
        
        # Generate Foodidu-specific analysis
        $suggestions = @()
        
        # Load time analysis
        if ($results.loadTime -lt 500) {
            $results.analysis.loadTimeGrade = "Excellent"
            Write-Output "  🟢 Load Time Grade: Excellent (<500ms)"
        } elseif ($results.loadTime -lt 1000) {
            $results.analysis.loadTimeGrade = "Good"
            Write-Output "  🟡 Load Time Grade: Good (500-1000ms)"
        } elseif ($results.loadTime -lt 2000) {
            $results.analysis.loadTimeGrade = "Fair"
            Write-Output "  🟠 Load Time Grade: Fair (1-2s)"
            $suggestions += "MEDIUM: Consider optimizing images and enabling browser caching for faster load times"
        } else {
            $results.analysis.loadTimeGrade = "Poor"
            Write-Output "  🔴 Load Time Grade: Poor (>2s)"
            $suggestions += "HIGH: Load time is slow. Optimize images, enable compression, and consider a CDN"
        }
        
        # Ping analysis
        if ($results.pingAverage -lt 50) {
            $results.analysis.pingGrade = "Excellent"
        } elseif ($results.pingAverage -lt 100) {
            $results.analysis.pingGrade = "Good"
        } elseif ($results.pingAverage -lt 200) {
            $results.analysis.pingGrade = "Fair"
            $suggestions += "LOW: Consider using a CDN to improve global response times"
        } else {
            $results.analysis.pingGrade = "Poor"
            $suggestions += "MEDIUM: High latency detected. CDN implementation recommended"
        }
        
        # Content size analysis
        $sizeKB = $results.contentLength / 1024
        if ($sizeKB -lt 100) {
            $results.analysis.sizeGrade = "Excellent"
        } elseif ($sizeKB -lt 500) {
            $results.analysis.sizeGrade = "Good"
        } elseif ($sizeKB -lt 1000) {
            $results.analysis.sizeGrade = "Fair"
        } else {
            $results.analysis.sizeGrade = "Poor"
            $suggestions += "MEDIUM: Large page size detected. Consider optimizing resources"
        }
        
        # Server configuration suggestions
        if (-not $compressionEnabled) {
            $suggestions += "HIGH: Enable gzip/brotli compression to reduce transfer sizes by 60-80%"
        }
        
        if (-not $cacheControlPresent) {
            $suggestions += "MEDIUM: Add Cache-Control headers to improve repeat visit performance"
        }
        
        # Foodidu-specific recommendations
        $suggestions += "INFO: For food delivery sites, consider implementing lazy loading for restaurant images"
        $suggestions += "INFO: Optimize promo code loading for better user experience"
        $suggestions += "INFO: Consider implementing service worker for offline functionality"
        
        $results.suggestions = $suggestions
        
        # Calculate overall score
        $score = 100
        if ($results.loadTime -gt 2000) { $score -= 25 }
        elseif ($results.loadTime -gt 1000) { $score -= 15 }
        elseif ($results.loadTime -gt 500) { $score -= 5 }
        
        if ($results.pingAverage -gt 200) { $score -= 15 }
        elseif ($results.pingAverage -gt 100) { $score -= 10 }
        elseif ($results.pingAverage -gt 50) { $score -= 5 }
        
        if (-not $compressionEnabled) { $score -= 20 }
        if (-not $cacheControlPresent) { $score -= 10 }
        if ($sizeKB -gt 1000) { $score -= 10 }
        
        $results.score = [math]::Max(0, $score)
        
        # Determine overall grade
        if ($results.score -ge 90) { $results.analysis.overallGrade = "A+" }
        elseif ($results.score -ge 80) { $results.analysis.overallGrade = "A" }
        elseif ($results.score -ge 70) { $results.analysis.overallGrade = "B" }
        elseif ($results.score -ge 60) { $results.analysis.overallGrade = "C" }
        else { $results.analysis.overallGrade = "D" }
        
        return $results
        
    } catch {
        Write-ColorOutput Red "❌ Analysis failed: $($_.Exception.Message)"
        throw
    }
}

function Show-FoodiduResults {
    param([hashtable]$Results)
    
    Write-Output ""
    Write-ColorOutput Cyan "📊 FOODIDU PERFORMANCE REPORT"
    Write-ColorOutput Cyan "==============================="
    Write-Output ""
    
    # Overall Score with grade
    $scoreColor = if ($Results.score -ge 80) { "Green" } elseif ($Results.score -ge 60) { "Yellow" } else { "Red" }
    Write-Output "🎯 Overall Performance Score: " -NoNewline
    Write-ColorOutput $scoreColor "$($Results.score)/100 (Grade: $($Results.analysis.overallGrade))"
    Write-Output ""
    
    # Detailed metrics
    Write-ColorOutput Yellow "📈 Performance Breakdown:"
    Write-Output "   Load Time: $($Results.loadTime)ms ($($Results.analysis.loadTimeGrade))"
    Write-Output "   Network Latency: $([math]::Round($Results.pingAverage))ms ($($Results.analysis.pingGrade))"
    Write-Output "   Page Size: $([math]::Round($Results.contentLength / 1024, 1))KB ($($Results.analysis.sizeGrade))"
    Write-Output "   Server Response: $($Results.httpStatus)"
    Write-Output ""
    
    # Server analysis
    Write-ColorOutput Yellow "🔧 Server Configuration:"
    Write-Output "   Server: $($Results.serverHeaders['Server'] -or 'Not disclosed')"
    Write-Output "   Compression: $(if($Results.serverHeaders.ContainsKey('Content-Encoding')){'✅ Enabled'}else{'❌ Disabled'})"
    Write-Output "   Cache Control: $(if($Results.serverHeaders.ContainsKey('Cache-Control')){'✅ Present'}else{'❌ Missing'})"
    Write-Output "   Content Type: $($Results.serverHeaders['Content-Type'] -or 'Not specified')"
    Write-Output ""
    
    # Recommendations
    if ($Results.suggestions.Count -gt 0) {
        Write-ColorOutput Yellow "💡 Foodidu-Specific Recommendations:"
        foreach ($suggestion in $Results.suggestions) {
            if ($suggestion.StartsWith("HIGH:")) {
                Write-ColorOutput Red "   🔴 $suggestion"
            } elseif ($suggestion.StartsWith("MEDIUM:")) {
                Write-ColorOutput Yellow "   🟡 $suggestion"
            } elseif ($suggestion.StartsWith("LOW:")) {
                Write-ColorOutput Green "   🟢 $suggestion"
            } else {
                Write-ColorOutput Cyan "   💡 $suggestion"
            }
        }
    } else {
        Write-ColorOutput Green "🎉 Excellent! No major performance issues detected for Foodidu!"
    }
    
    Write-Output ""
    Write-ColorOutput Cyan "🍽️  Foodidu-Specific Performance Tips:"
    Write-Output "   • Optimize restaurant images with WebP format"
    Write-Output "   • Implement lazy loading for deal cards"
    Write-Output "   • Cache promo codes for faster loading"
    Write-Output "   • Use CDN for static assets (logos, icons)"
    Write-Output "   • Minimize JavaScript for mobile users"
    Write-Output ""
}

# Main execution
try {
    $results = Test-FoodiduPerformance
    Show-FoodiduResults -Results $results
    
    if ($SaveReport) {
        $reportFile = "foodidu-performance-report-$(Get-Date -Format 'yyyy-MM-dd-HHmm').json"
        $jsonReport = $results | ConvertTo-Json -Depth 10
        $jsonReport | Out-File -FilePath $reportFile -Encoding UTF8
        Write-ColorOutput Green "📄 Detailed report saved to: $reportFile"
    }
    
    if ($Detailed) {
        Write-Output ""
        Write-ColorOutput Cyan "🔍 DETAILED ANALYSIS"
        Write-ColorOutput Cyan "===================="
        Write-Output ""
        Write-ColorOutput Yellow "Server Headers:"
        foreach ($header in $results.serverHeaders.GetEnumerator()) {
            Write-Output "   $($header.Key): $($header.Value)"
        }
    }
    
    Write-Output ""
    Write-ColorOutput Green "✅ Foodidu performance analysis completed!"
    Write-ColorOutput Cyan "💡 Run with -Detailed flag for more information"
    Write-ColorOutput Cyan "💡 Run with -SaveReport flag to save JSON report"
    
} catch {
    Write-ColorOutput Red "❌ Analysis failed: $($_.Exception.Message)"
    exit 1
}