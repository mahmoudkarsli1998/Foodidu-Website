# 🚀 Website Performance Analyzer Suite

A comprehensive toolkit for analyzing website performance, memory usage, CPU efficiency, and load optimization. This suite provides both browser-based JavaScript analysis and command-line PowerShell analysis tools.

## 📋 What's Included

### 🌐 Browser-Based Analysis
- **`performance-diagnostics.html`** - Interactive web interface for real-time analysis
- **`performance-diagnostics.js`** - JavaScript engine for comprehensive performance metrics

### 💻 Command-Line Analysis  
- **`website-performance-analyzer.ps1`** - PowerShell script for external website analysis
- **`analyze-website.bat`** - Simple batch file to run PowerShell analysis

## 🎯 Features

### Memory Analysis
- ✅ JavaScript heap usage monitoring
- ✅ DOM node count analysis
- ✅ Event listener tracking
- ✅ Memory leak detection

### CPU Performance
- ✅ CPU benchmark scoring
- ✅ Long task detection (>50ms)
- ✅ Main thread blocking analysis
- ✅ Performance bottleneck identification

### Network Performance
- ✅ HTTP request counting
- ✅ Transfer size analysis
- ✅ Compression ratio testing
- ✅ Cache hit rate measurement
- ✅ Ping and latency testing

### Rendering Performance
- ✅ First Paint (FP) timing
- ✅ First Contentful Paint (FCP) timing
- ✅ DOM Content Loaded timing
- ✅ Cumulative Layout Shift (CLS) measurement

### Optimization Suggestions
- ✅ Automated performance recommendations
- ✅ Severity-based issue prioritization
- ✅ Actionable improvement suggestions
- ✅ Performance score calculation (0-100)

## 🚀 Quick Start

### Method 1: Browser Analysis (Recommended)

1. **Open the HTML file**:
   ```
   Double-click performance-diagnostics.html
   ```

2. **Analyze current page**:
   - Click "🔍 Analyze Current Page" for immediate analysis
   - View comprehensive metrics and suggestions
   - Export report as JSON for further analysis

3. **Analyze any website**:
   - Navigate to the target website
   - Open browser developer tools (F12)
   - Paste this code in the console:
   ```javascript
   // Load the diagnostics script
   const script = document.createElement('script');
   script.src = 'https://your-domain.com/performance-diagnostics.js';
   document.head.appendChild(script);
   
   // Run analysis after script loads
   script.onload = () => {
       window.runDiagnostics();
   };
   ```

### Method 2: PowerShell Analysis

1. **Simple execution**:
   ```powershell
   .\analyze-website.bat
   ```

2. **Direct PowerShell**:
   ```powershell
   .\website-performance-analyzer.ps1 -Url "https://example.com" -Verbose -OpenReport
   ```

3. **Advanced usage**:
   ```powershell
   .\website-performance-analyzer.ps1 -Url "https://example.com" -OutputFile "custom-report.json" -Verbose
   ```

## 📊 Understanding the Results

### Performance Score Interpretation
- **90-100**: 🟢 Excellent performance
- **70-89**: 🟡 Good performance, minor optimizations needed  
- **50-69**: 🟠 Average performance, several improvements recommended
- **30-49**: 🔴 Poor performance, significant optimizations required
- **0-29**: 🚨 Critical performance issues, immediate attention needed

### Key Metrics Explained

#### Memory Metrics
- **Used Heap Size**: Current JavaScript memory usage
- **Memory Usage %**: Percentage of available heap used
- **DOM Nodes**: Total number of DOM elements (target: <1500)
- **Event Listeners**: Approximate count of attached event handlers

#### CPU Metrics  
- **CPU Score**: Operations per millisecond benchmark
- **Long Tasks**: Tasks taking >50ms (blocks main thread)
- **Main Thread Blocking**: Time main thread is unavailable

#### Network Metrics
- **Total Requests**: Number of HTTP requests made (target: <50)
- **Transfer Size**: Total bytes transferred (target: <2MB)
- **Compression Ratio**: Effectiveness of server compression
- **Cache Hit Ratio**: Percentage of resources served from cache

#### Rendering Metrics
- **First Paint**: Time to first pixel rendered (target: <2s)
- **First Contentful Paint**: Time to first content rendered (target: <2.5s)
- **DOM Content Loaded**: Time for DOM parsing completion (target: <3s)
- **Layout Shifts**: Cumulative Layout Shift score (target: <0.1)

## 🛠️ Integration Examples

### WordPress Integration
Add to your theme's `functions.php`:
```php
function add_performance_diagnostics() {
    if (current_user_can('administrator')) {
        wp_enqueue_script('performance-diagnostics', 
            get_template_directory_uri() . '/js/performance-diagnostics.js', 
            array(), '1.0.0', true);
    }
}
add_action('wp_enqueue_scripts', 'add_performance_diagnostics');
```

### React/Vue Integration
```javascript
import PerformanceDiagnostics from './performance-diagnostics.js';

// In your component
useEffect(() => {
    const diagnostics = new PerformanceDiagnostics();
    diagnostics.init().then(report => {
        console.log('Performance Score:', report.score);
        // Handle report data
    });
}, []);
```

### Continuous Monitoring
```javascript
// Monitor performance every 30 seconds
setInterval(async () => {
    const diagnostics = new PerformanceDiagnostics();
    const report = await diagnostics.init();
    
    // Send to monitoring service
    fetch('/api/performance', {
        method: 'POST',
        body: JSON.stringify(report)
    });
}, 30000);
```

## 🎯 Common Optimization Suggestions

### 🔴 High Priority Issues
- **Large Transfer Sizes**: Enable compression, optimize images
- **Many HTTP Requests**: Bundle resources, use HTTP/2
- **Slow First Contentful Paint**: Optimize critical rendering path
- **Long Tasks**: Break up JavaScript execution, use Web Workers

### 🟡 Medium Priority Issues  
- **High Memory Usage**: Reduce DOM complexity, remove unused listeners
- **Layout Shifts**: Set image dimensions, avoid dynamic content insertion
- **Render-blocking Resources**: Use async/defer, inline critical CSS

### 🟢 Low Priority Issues
- **Missing Lazy Loading**: Add `loading="lazy"` to images
- **Multiple Stylesheets**: Combine CSS files
- **Synchronous Scripts**: Add async/defer attributes

## 🔧 Customization

### Custom Thresholds
```javascript
const diagnostics = new PerformanceDiagnostics();

// Override default thresholds
diagnostics.thresholds = {
    memoryUsage: 70,        // % (default: 80)
    domNodes: 1000,         // count (default: 1500)
    transferSize: 1048576,  // bytes (default: 2MB)
    firstContentfulPaint: 2000  // ms (default: 2500)
};

diagnostics.init();
```

### Custom Suggestions
```javascript
diagnostics.addCustomAnalyzer('customCheck', (metrics) => {
    if (metrics.network.totalRequests > 50) {
        return {
            category: 'Custom',
            severity: 'medium',
            issue: 'Too many requests for mobile users',
            suggestion: 'Consider implementing request batching'
        };
    }
});
```

## 🔍 Troubleshooting

### Common Issues

**"Memory measurement not available"**
- Browser doesn't support `performance.memory`
- Use Chrome/Edge for full memory analysis

**"Long task measurement failed"**  
- Browser doesn't support Performance Observer
- Fallback measurements will be used

**"Cross-origin analysis blocked"**
- Cannot analyze external websites directly
- Use PowerShell script for external analysis

**PowerShell execution policy error**
- Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Or use the batch file which bypasses the policy

### Browser Compatibility
- **Full Support**: Chrome 60+, Firefox 57+, Safari 14+
- **Partial Support**: IE 11 (limited metrics)
- **Required APIs**: Performance API, Performance Observer (optional)

## 📈 Performance Benchmarks

### Industry Standards
- **First Contentful Paint**: <2.5s (good), <4s (needs improvement)
- **Largest Contentful Paint**: <2.5s (good), <4s (needs improvement)  
- **Cumulative Layout Shift**: <0.1 (good), <0.25 (needs improvement)
- **First Input Delay**: <100ms (good), <300ms (needs improvement)

### Mobile vs Desktop
- **Mobile**: Generally 2-3x slower than desktop
- **3G Connection**: Target <5s total load time
- **4G Connection**: Target <3s total load time

## 🚀 Advanced Usage

### A/B Testing Integration
```javascript
const diagnostics = new PerformanceDiagnostics();
diagnostics.init().then(report => {
    const variant = getExperimentVariant();
    
    analytics.track('performance_metrics', {
        variant: variant,
        score: report.score,
        loadTime: report.metrics.rendering.firstContentfulPaint
    });
});
```

### Performance Budgets
```javascript
const performanceBudget = {
    maxLoadTime: 3000,
    maxTransferSize: 2097152, // 2MB
    maxDOMNodes: 1500,
    minScore: 80
};

diagnostics.init().then(report => {
    const violations = [];
    
    if (report.metrics.rendering.firstContentfulPaint > performanceBudget.maxLoadTime) {
        violations.push('Load time budget exceeded');
    }
    
    if (violations.length > 0) {
        console.warn('Performance budget violations:', violations);
    }
});
```

## 📞 Support & Documentation

- **Issues**: Report bugs or request features
- **Documentation**: Full API documentation available
- **Examples**: Check the examples folder for more use cases
- **Community**: Join our performance optimization community

---

## 🎉 You're All Set!

Your comprehensive website performance analysis toolkit is ready to use! Start with the browser-based analysis for immediate insights, then use the PowerShell script for automated monitoring and external website analysis.

### Next Steps:
1. 🔍 Run your first analysis
2. 📊 Review the performance score and suggestions  
3. 🛠️ Implement the recommended optimizations
4. 📈 Monitor improvements over time
5. 🚀 Achieve optimal website performance!

**Happy optimizing!** 🚀✨