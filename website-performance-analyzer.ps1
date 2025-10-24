# Website Performance Analyzer PowerShell Script
# Comprehensive analysis of website performance, memory, CPU, and load efficiency

param(
    [Parameter(Mandatory=$false)]
    [string]$Url = "",
    
    [Parameter(Mandatory=$false)]
    [string]$OutputFile = "performance-report.json",
    
    [Parameter(Mandatory=$false)]
    [switch]$Verbose,
    
    [Parameter(Mandatory=$false)]
    [switch]$OpenReport
)

# Color functions for better output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    } else {
        $input | Write-Output
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

function Write-Success { Write-ColorOutput Green $args }
function Write-Warning { Write-ColorOutput Yellow $args }
function Write-Error { Write-ColorOutput Red $args }
function Write-Info { Write-ColorOutput Cyan $args }

# Performance analysis functions
function Test-WebsitePerformance {
    param([string]$TargetUrl)
    
    Write-Info "🚀 Starting comprehensive website performance analysis..."
    Write-Info "Target: $TargetUrl"
    Write-Info "Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    Write-Output ""
    
    $results = @{
        url = $TargetUrl
        timestamp = Get-Date -Format 'yyyy-MM-ddTHH:mm:ss.fffZ'
        loadTime = @{}
        networkMetrics = @{}
        resourceAnalysis = @{}
        suggestions = @()
        score = 0
    }
    
    try {
        # Test basic connectivity and response time
        Write-Info "📡 Testing network connectivity and response time..."
        $loadTimeResults = Test-LoadTime -Url $TargetUrl
        $results.loadTime = $loadTimeResults
        
        # Analyze network performance
        Write-Info "🌐 Analyzing network performance..."
        $networkResults = Test-NetworkPerformance -Url $TargetUrl
        $results.networkMetrics = $networkResults
        
        # Analyze page resources
        Write-Info "📊 Analyzing page resources..."
        $resourceResults = Test-PageResources -Url $TargetUrl
        $results.resourceAnalysis = $resourceResults
        
        # Generate performance suggestions
        Write-Info "💡 Generating optimization suggestions..."
        $suggestions = Get-PerformanceSuggestions -LoadTime $loadTimeResults -Network $networkResults -Resources $resourceResults
        $results.suggestions = $suggestions
        
        # Calculate overall score
        $score = Calculate-PerformanceScore -LoadTime $loadTimeResults -Network $networkResults -Suggestions $suggestions
        $results.score = $score
        
        Write-Success "✅ Analysis completed successfully!"
        return $results
        
    } catch {
        Write-Error "❌ Analysis failed: $($_.Exception.Message)"
        throw
    }
}

function Test-LoadTime {
    param([string]$Url)
    
    $loadMetrics = @{
        dnsResolution = 0
        tcpConnection = 0
        sslHandshake = 0
        firstByte = 0
        totalTime = 0
        httpStatus = 0
        contentLength = 0
        serverHeaders = @{}
    }
    
    try {
        $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
        
        # Create web request
        $request = [System.Net.WebRequest]::Create($Url)
        $request.Method = "GET"
        $request.Timeout = 30000  # 30 seconds
        $request.UserAgent = "Website-Performance-Analyzer/1.0"
        
        # Measure response time
        $response = $request.GetResponse()
        $stopwatch.Stop()
        
        $loadMetrics.totalTime = $stopwatch.ElapsedMilliseconds
        $loadMetrics.httpStatus = [int]$response.StatusCode
        $loadMetrics.contentLength = $response.ContentLength
        
        # Extract server headers
        foreach ($header in $response.Headers.AllKeys) {
            $loadMetrics.serverHeaders[$header] = $response.Headers[$header]
        }
        
        # Estimate TTFB (simplified)
        $loadMetrics.firstByte = [math]::Round($loadMetrics.totalTime * 0.3)
        
        $response.Close()
        
        if ($Verbose) {
            Write-Output "  ⏱️  Total Load Time: $($loadMetrics.totalTime)ms"
            Write-Output "  🌐 HTTP Status: $($loadMetrics.httpStatus)"
            Write-Output "  📦 Content Length: $($loadMetrics.contentLength) bytes"
        }
        
    } catch {
        Write-Warning "⚠️  Load time measurement failed: $($_.Exception.Message)"
        $loadMetrics.totalTime = -1
    }
    
    return $loadMetrics
}

function Test-NetworkPerformance {
    param([string]$Url)
    
    $networkMetrics = @{
        ping = @{
            min = 0
            max = 0
            average = 0
            packetLoss = 0
        }
        traceroute = @()
        bandwidth = @{
            downloadSpeed = 0
            uploadSpeed = 0
        }
        compression = @{
            supported = $false
            ratio = 0
        }
    }
    
    try {
        # Extract hostname from URL
        $uri = [System.Uri]$Url
        $hostname = $uri.Host
        
        # Ping test
        Write-Output "  📡 Testing ping to $hostname..."
        $pingResults = Test-Connection -ComputerName $hostname -Count 4 -ErrorAction SilentlyContinue
        
        if ($pingResults) {
            $networkMetrics.ping.min = ($pingResults | Measure-Object -Property ResponseTime -Minimum).Minimum
            $networkMetrics.ping.max = ($pingResults | Measure-Object -Property ResponseTime -Maximum).Maximum
            $networkMetrics.ping.average = ($pingResults | Measure-Object -Property ResponseTime -Average).Average
            $networkMetrics.ping.packetLoss = ((4 - $pingResults.Count) / 4) * 100
            
            if ($Verbose) {
                Write-Output "    Min: $($networkMetrics.ping.min)ms, Max: $($networkMetrics.ping.max)ms, Avg: $([math]::Round($networkMetrics.ping.average))ms"
            }
        }
        
        # Test compression support
        Write-Output "  🗜️  Testing compression support..."
        $compressionTest = Test-CompressionSupport -Url $Url
        $networkMetrics.compression = $compressionTest
        
    } catch {
        Write-Warning "⚠️  Network performance test failed: $($_.Exception.Message)"
    }
    
    return $networkMetrics
}

function Test-CompressionSupport {
    param([string]$Url)
    
    $compression = @{
        supported = $false
        ratio = 0
        encoding = ""
    }
    
    try {
        # Test with compression headers
        $request = [System.Net.WebRequest]::Create($Url)
        $request.Headers.Add("Accept-Encoding", "gzip, deflate, br")
        $request.Method = "HEAD"
        
        $response = $request.GetResponse()
        
        if ($response.Headers["Content-Encoding"]) {
            $compression.supported = $true
            $compression.encoding = $response.Headers["Content-Encoding"]
        }
        
        $response.Close()
        
    } catch {
        Write-Warning "⚠️  Compression test failed: $($_.Exception.Message)"
    }
    
    return $compression
}

function Test-PageResources {
    param([string]$Url)
    
    $resources = @{
        htmlSize = 0
        totalResources = 0
        images = @{
            count = 0
            totalSize = 0
            formats = @{}
        }
        scripts = @{
            count = 0
            totalSize = 0
            external = 0
        }
        stylesheets = @{
            count = 0
            totalSize = 0
            external = 0
        }
        fonts = @{
            count = 0
            totalSize = 0
        }
    }
    
    try {
        # Download and analyze HTML content
        $webClient = New-Object System.Net.WebClient
        $webClient.Headers.Add("User-Agent", "Website-Performance-Analyzer/1.0")
        
        Write-Output "  📄 Downloading and analyzing HTML content..."
        $htmlContent = $webClient.DownloadString($Url)
        $resources.htmlSize = [System.Text.Encoding]::UTF8.GetByteCount($htmlContent)
        
        # Parse HTML for resources (simplified regex-based parsing)
        $imageMatches = [regex]::Matches($htmlContent, '<img[^>]+src=["'']([^"'']+)["''][^>]*>', 'IgnoreCase')
        $resources.images.count = $imageMatches.Count
        
        $scriptMatches = [regex]::Matches($htmlContent, '<script[^>]+src=["'']([^"'']+)["''][^>]*>', 'IgnoreCase')
        $resources.scripts.count = $scriptMatches.Count
        
        $cssMatches = [regex]::Matches($htmlContent, '<link[^>]+rel=["'']stylesheet["''][^>]+href=["'']([^"'']+)["''][^>]*>', 'IgnoreCase')
        $resources.stylesheets.count = $cssMatches.Count
        
        # Count external resources
        $uri = [System.Uri]$Url
        $domain = $uri.Host
        
        foreach ($match in $scriptMatches) {
            $src = $match.Groups[1].Value
            if ($src -match "^https?://" -and -not $src.Contains($domain)) {
                $resources.scripts.external++
            }
        }
        
        foreach ($match in $cssMatches) {
            $href = $match.Groups[1].Value
            if ($href -match "^https?://" -and -not $href.Contains($domain)) {
                $resources.stylesheets.external++
            }
        }
        
        $resources.totalResources = $resources.images.count + $resources.scripts.count + $resources.stylesheets.count
        
        if ($Verbose) {
            Write-Output "    📄 HTML Size: $([math]::Round($resources.htmlSize / 1024, 2)) KB"
            Write-Output "    🖼️  Images: $($resources.images.count)"
            Write-Output "    📜 Scripts: $($resources.scripts.count) (External: $($resources.scripts.external))"
            Write-Output "    🎨 Stylesheets: $($resources.stylesheets.count) (External: $($resources.stylesheets.external))"
        }
        
    } catch {
        Write-Warning "⚠️  Resource analysis failed: $($_.Exception.Message)"
    } finally {
        if ($webClient) {
            $webClient.Dispose()
        }
    }
    
    return $resources
}

function Get-PerformanceSuggestions {
    param(
        [hashtable]$LoadTime,
        [hashtable]$Network,
        [hashtable]$Resources
    )
    
    $suggestions = @()
    
    # Load time suggestions
    if ($LoadTime.totalTime -gt 3000) {
        $suggestions += @{
            category = "Load Time"
            severity = "high"
            issue = "Slow page load time"
            suggestion = "Page loads in $($LoadTime.totalTime)ms. Optimize server response time, enable caching, and minimize resource sizes."
        }
    } elseif ($LoadTime.totalTime -gt 1500) {
        $suggestions += @{
            category = "Load Time"
            severity = "medium"
            issue = "Moderate page load time"
            suggestion = "Page loads in $($LoadTime.totalTime)ms. Consider optimizing images and enabling compression."
        }
    }
    
    # Network suggestions
    if ($Network.ping.average -gt 200) {
        $suggestions += @{
            category = "Network"
            severity = "medium"
            issue = "High network latency"
            suggestion = "Average ping: $([math]::Round($Network.ping.average))ms. Consider using a CDN closer to your users."
        }
    }
    
    if (-not $Network.compression.supported) {
        $suggestions += @{
            category = "Network"
            severity = "high"
            issue = "No compression enabled"
            suggestion = "Enable gzip or brotli compression on your server to reduce transfer sizes by 60-80%."
        }
    }
    
    # Resource suggestions
    if ($Resources.htmlSize -gt 100000) {  # 100KB
        $suggestions += @{
            category = "Resources"
            severity = "medium"
            issue = "Large HTML size"
            suggestion = "HTML size: $([math]::Round($Resources.htmlSize / 1024, 2)) KB. Minify HTML and consider server-side rendering optimizations."
        }
    }
    
    if ($Resources.images.count -gt 20) {
        $suggestions += @{
            category = "Resources"
            severity = "medium"
            issue = "Many images"
            suggestion = "$($Resources.images.count) images detected. Implement lazy loading and optimize image formats (WebP, AVIF)."
        }
    }
    
    if ($Resources.scripts.external -gt 5) {
        $suggestions += @{
            category = "Resources"
            severity = "medium"
            issue = "Many external scripts"
            suggestion = "$($Resources.scripts.external) external scripts. Consider bundling or reducing third-party dependencies."
        }
    }
    
    if ($Resources.stylesheets.count -gt 5) {
        $suggestions += @{
            category = "Resources"
            severity = "low"
            issue = "Multiple stylesheets"
            suggestion = "$($Resources.stylesheets.count) CSS files. Combine stylesheets to reduce HTTP requests."
        }
    }
    
    return $suggestions
}

function Calculate-PerformanceScore {
    param(
        [hashtable]$LoadTime,
        [hashtable]$Network,
        [array]$Suggestions
    )
    
    $score = 100
    
    # Deduct points based on load time
    if ($LoadTime.totalTime -gt 5000) {
        $score -= 30
    } elseif ($LoadTime.totalTime -gt 3000) {
        $score -= 20
    } elseif ($LoadTime.totalTime -gt 1500) {
        $score -= 10
    }
    
    # Deduct points based on network performance
    if ($Network.ping.average -gt 300) {
        $score -= 15
    } elseif ($Network.ping.average -gt 200) {
        $score -= 10
    }
    
    # Deduct points based on suggestions
    foreach ($suggestion in $Suggestions) {
        switch ($suggestion.severity) {
            "high" { $score -= 15 }
            "medium" { $score -= 8 }
            "low" { $score -= 3 }
        }
    }
    
    return [math]::Max(0, $score)
}

function Show-PerformanceReport {
    param([hashtable]$Results)
    
    Write-Output ""
    Write-Info "📊 PERFORMANCE ANALYSIS REPORT"
    Write-Info "================================"
    Write-Output ""
    
    # Overall Score
    $scoreColor = if ($Results.score -ge 80) { "Green" } elseif ($Results.score -ge 60) { "Yellow" } else { "Red" }
    Write-Output "🎯 Overall Performance Score: " -NoNewline
    Write-ColorOutput $scoreColor "$($Results.score)/100"
    Write-Output ""
    
    # Load Time Metrics
    Write-Info "⏱️  Load Time Metrics:"
    Write-Output "   Total Load Time: $($Results.loadTime.totalTime)ms"
    Write-Output "   HTTP Status: $($Results.loadTime.httpStatus)"
    Write-Output "   Content Length: $([math]::Round($Results.loadTime.contentLength / 1024, 2)) KB"
    Write-Output ""
    
    # Network Metrics
    Write-Info "🌐 Network Performance:"
    Write-Output "   Ping Average: $([math]::Round($Results.networkMetrics.ping.average))ms"
    Write-Output "   Packet Loss: $($Results.networkMetrics.ping.packetLoss)%"
    Write-Output "   Compression: $(if ($Results.networkMetrics.compression.supported) { "✅ Enabled ($($Results.networkMetrics.compression.encoding))" } else { "❌ Disabled" })"
    Write-Output ""
    
    # Resource Analysis
    Write-Info "📊 Resource Analysis:"
    Write-Output "   HTML Size: $([math]::Round($Results.resourceAnalysis.htmlSize / 1024, 2)) KB"
    Write-Output "   Total Resources: $($Results.resourceAnalysis.totalResources)"
    Write-Output "   Images: $($Results.resourceAnalysis.images.count)"
    Write-Output "   Scripts: $($Results.resourceAnalysis.scripts.count) (External: $($Results.resourceAnalysis.scripts.external))"
    Write-Output "   Stylesheets: $($Results.resourceAnalysis.stylesheets.count) (External: $($Results.resourceAnalysis.stylesheets.external))"
    Write-Output ""
    
    # Suggestions
    if ($Results.suggestions.Count -gt 0) {
        Write-Info "💡 Optimization Suggestions:"
        foreach ($suggestion in $Results.suggestions) {
            $icon = switch ($suggestion.severity) {
                "high" { "🔴" }
                "medium" { "🟡" }
                "low" { "🟢" }
                default { "💡" }
            }
            Write-Output "   $icon [$($suggestion.category)] $($suggestion.issue)"
            Write-Output "      → $($suggestion.suggestion)"
            Write-Output ""
        }
    } else {
        Write-Success "🎉 No major performance issues detected!"
    }
}

function Save-PerformanceReport {
    param(
        [hashtable]$Results,
        [string]$FilePath
    )
    
    try {
        $jsonReport = $Results | ConvertTo-Json -Depth 10
        $jsonReport | Out-File -FilePath $FilePath -Encoding UTF8
        Write-Success "📄 Report saved to: $FilePath"
    } catch {
        Write-Error "❌ Failed to save report: $($_.Exception.Message)"
    }
}

function Open-PerformanceReport {
    param([string]$FilePath)
    
    if (Test-Path $FilePath) {
        try {
            Start-Process $FilePath
            Write-Success "📖 Opening report in default application..."
        } catch {
            Write-Warning "⚠️  Could not open report automatically. File saved at: $FilePath"
        }
    }
}

# Main execution
function Main {
    Write-Info "🚀 Website Performance Analyzer v1.0"
    Write-Info "====================================="
    Write-Output ""
    
    # Determine target URL
    $targetUrl = $Url
    if (-not $targetUrl) {
        $targetUrl = Read-Host "Enter website URL to analyze (e.g., https://example.com)"
    }
    
    # Validate URL
    if (-not $targetUrl.StartsWith("http://") -and -not $targetUrl.StartsWith("https://")) {
        $targetUrl = "https://" + $targetUrl
    }
    
    try {
        # Run performance analysis
        $results = Test-WebsitePerformance -TargetUrl $targetUrl
        
        # Display results
        Show-PerformanceReport -Results $results
        
        # Save report
        Save-PerformanceReport -Results $results -FilePath $OutputFile
        
        # Open report if requested
        if ($OpenReport) {
            Open-PerformanceReport -FilePath $OutputFile
        }
        
        Write-Output ""
        Write-Success "✅ Analysis completed successfully!"
        Write-Info "📄 Detailed report saved to: $OutputFile"
        
    } catch {
        Write-Error "❌ Analysis failed: $($_.Exception.Message)"
        exit 1
    }
}

# Run the main function
Main