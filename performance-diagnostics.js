/**
 * Website Performance Diagnostics Tool
 * Comprehensive analysis of memory, CPU, network, and rendering performance
 */
class PerformanceDiagnostics {
    constructor() {
        this.thresholds = {
            memoryUsage: 80,           // % of heap used
            domNodes: 1500,            // number of DOM nodes
            eventListeners: 100,       // approximate event listeners
            transferSize: 2097152,     // 2MB in bytes
            totalRequests: 50,         // number of HTTP requests
            firstContentfulPaint: 2500, // ms
            firstPaint: 2000,          // ms
            domContentLoaded: 3000,    // ms
            layoutShifts: 0.1,         // CLS score
            longTasks: 5,              // number of long tasks
            cpuScore: 1000             // operations per ms
        };
        
        this.metrics = {};
        this.suggestions = [];
    }

    /**
     * Initialize performance monitoring
     */
    async init() {
        console.log('🚀 Starting performance diagnostics...');
        
        try {
            // Collect all metrics
            await this.collectMetrics();
            
            // Analyze and generate suggestions
            this.analyzePerformance();
            
            // Generate comprehensive report
            const report = this.generateReport();
            
            console.log('✅ Performance analysis complete');
            return report;
            
        } catch (error) {
            console.error('❌ Performance analysis failed:', error);
            throw error;
        }
    }

    /**
     * Collect all performance metrics
     */
    async collectMetrics() {
        this.metrics = {
            memory: await this.measureMemory(),
            cpu: await this.measureCPU(),
            network: await this.measureNetwork(),
            rendering: await this.measureRendering(),
            resources: await this.analyzeResources(),
            pageLoad: await this.measurePageLoad()
        };
    }

    /**
     * Measure memory usage
     */
    async measureMemory() {
        const memory = {
            usedJSHeapSize: 0,
            totalJSHeapSize: 0,
            jsHeapSizeLimit: 0,
            memoryUsagePercentage: 0,
            domNodes: 0,
            eventListeners: 0
        };

        // JavaScript heap memory (Chrome/Edge only)
        if (performance.memory) {
            memory.usedJSHeapSize = performance.memory.usedJSHeapSize;
            memory.totalJSHeapSize = performance.memory.totalJSHeapSize;
            memory.jsHeapSizeLimit = performance.memory.jsHeapSizeLimit;
            memory.memoryUsagePercentage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        }

        // DOM nodes count
        memory.domNodes = document.querySelectorAll('*').length;

        // Approximate event listeners count
        memory.eventListeners = this.estimateEventListeners();

        return memory;
    }

    /**
     * Measure CPU performance
     */
    async measureCPU() {
        const cpu = {
            iterationsPerMs: 0,
            longTasks: 0,
            mainThreadBlocking: 0
        };

        // CPU benchmark
        const startTime = performance.now();
        let iterations = 0;
        const benchmarkDuration = 100; // ms

        while (performance.now() - startTime < benchmarkDuration) {
            // Simple CPU-intensive operation
            Math.sqrt(Math.random() * 1000000);
            iterations++;
        }

        const actualDuration = performance.now() - startTime;
        cpu.iterationsPerMs = iterations / actualDuration;

        // Long tasks detection (if supported)
        if ('PerformanceObserver' in window) {
            try {
                const longTaskEntries = performance.getEntriesByType('longtask');
                cpu.longTasks = longTaskEntries.length;
                cpu.mainThreadBlocking = longTaskEntries.reduce((total, task) => total + task.duration, 0);
            } catch (e) {
                console.warn('Long task measurement not available:', e.message);
            }
        }

        return cpu;
    }

    /**
     * Measure network performance
     */
    async measureNetwork() {
        const network = {
            totalRequests: 0,
            totalTransferSize: 0,
            totalEncodedSize: 0,
            compressionRatio: 0,
            cacheHitRatio: 0,
            resourceTypes: {}
        };

        try {
            const resources = performance.getEntriesByType('resource');
            network.totalRequests = resources.length;

            let totalTransferSize = 0;
            let totalEncodedSize = 0;
            let cachedResources = 0;

            resources.forEach(resource => {
                // Transfer sizes
                if (resource.transferSize !== undefined) {
                    totalTransferSize += resource.transferSize;
                }
                if (resource.encodedBodySize !== undefined) {
                    totalEncodedSize += resource.encodedBodySize;
                }

                // Cache detection
                if (resource.transferSize === 0 && resource.decodedBodySize > 0) {
                    cachedResources++;
                }

                // Resource type counting
                const type = this.getResourceType(resource.name);
                network.resourceTypes[type] = (network.resourceTypes[type] || 0) + 1;
            });

            network.totalTransferSize = totalTransferSize;
            network.totalEncodedSize = totalEncodedSize;
            
            if (totalEncodedSize > 0) {
                network.compressionRatio = ((totalEncodedSize - totalTransferSize) / totalEncodedSize) * 100;
            }
            
            if (resources.length > 0) {
                network.cacheHitRatio = (cachedResources / resources.length) * 100;
            }

        } catch (error) {
            console.warn('Network measurement failed:', error.message);
        }

        return network;
    }

    /**
     * Measure rendering performance
     */
    async measureRendering() {
        const rendering = {
            firstPaint: 0,
            firstContentfulPaint: 0,
            domContentLoaded: 0,
            loadComplete: 0,
            layoutShifts: 0
        };

        try {
            // Paint timing
            const paintEntries = performance.getEntriesByType('paint');
            paintEntries.forEach(entry => {
                if (entry.name === 'first-paint') {
                    rendering.firstPaint = entry.startTime;
                } else if (entry.name === 'first-contentful-paint') {
                    rendering.firstContentfulPaint = entry.startTime;
                }
            });

            // Navigation timing
            const navEntries = performance.getEntriesByType('navigation');
            if (navEntries.length > 0) {
                const nav = navEntries[0];
                rendering.domContentLoaded = nav.domContentLoadedEventEnd - nav.navigationStart;
                rendering.loadComplete = nav.loadEventEnd - nav.navigationStart;
            }

            // Layout shifts (if supported)
            if ('PerformanceObserver' in window) {
                try {
                    const layoutShiftEntries = performance.getEntriesByType('layout-shift');
                    rendering.layoutShifts = layoutShiftEntries
                        .filter(entry => !entry.hadRecentInput)
                        .reduce((total, entry) => total + entry.value, 0);
                } catch (e) {
                    console.warn('Layout shift measurement not available:', e.message);
                }
            }

        } catch (error) {
            console.warn('Rendering measurement failed:', error.message);
        }

        return rendering;
    }

    /**
     * Analyze page resources
     */
    async analyzeResources() {
        const resources = {
            images: { count: 0, totalSize: 0, unoptimized: 0 },
            scripts: { count: 0, totalSize: 0, blocking: 0 },
            stylesheets: { count: 0, totalSize: 0, blocking: 0 },
            fonts: { count: 0, totalSize: 0 },
            other: { count: 0, totalSize: 0 }
        };

        // Analyze DOM elements
        const images = document.querySelectorAll('img');
        resources.images.count = images.length;
        
        images.forEach(img => {
            if (!img.loading || img.loading !== 'lazy') {
                resources.images.unoptimized++;
            }
        });

        const scripts = document.querySelectorAll('script[src]');
        resources.scripts.count = scripts.length;
        
        scripts.forEach(script => {
            if (!script.async && !script.defer) {
                resources.scripts.blocking++;
            }
        });

        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        resources.stylesheets.count = stylesheets.length;

        const fonts = document.querySelectorAll('link[rel="preload"][as="font"], @font-face');
        resources.fonts.count = fonts.length;

        return resources;
    }

    /**
     * Measure page load metrics
     */
    async measurePageLoad() {
        const pageLoad = {
            domInteractive: 0,
            domComplete: 0,
            loadEventEnd: 0,
            unloadEventEnd: 0
        };

        try {
            const navTiming = performance.getEntriesByType('navigation')[0];
            if (navTiming) {
                pageLoad.domInteractive = navTiming.domInteractive - navTiming.navigationStart;
                pageLoad.domComplete = navTiming.domComplete - navTiming.navigationStart;
                pageLoad.loadEventEnd = navTiming.loadEventEnd - navTiming.navigationStart;
                pageLoad.unloadEventEnd = navTiming.unloadEventEnd - navTiming.navigationStart;
            }
        } catch (error) {
            console.warn('Page load measurement failed:', error.message);
        }

        return pageLoad;
    }

    /**
     * Analyze performance and generate suggestions
     */
    analyzePerformance() {
        this.suggestions = [];
        
        this.analyzeMemoryIssues();
        this.analyzeCPUIssues();
        this.analyzeNetworkIssues();
        this.analyzeRenderingIssues();
        this.analyzeResourceIssues();
    }

    /**
     * Analyze memory-related issues
     */
    analyzeMemoryIssues() {
        const { memory } = this.metrics;

        if (memory.memoryUsagePercentage > this.thresholds.memoryUsage) {
            this.suggestions.push({
                category: 'Memory',
                severity: 'high',
                issue: 'High memory usage detected',
                suggestion: `Memory usage is ${memory.memoryUsagePercentage.toFixed(1)}%. Consider reducing DOM complexity, removing unused event listeners, and optimizing JavaScript objects.`
            });
        }

        if (memory.domNodes > this.thresholds.domNodes) {
            this.suggestions.push({
                category: 'Memory',
                severity: 'medium',
                issue: 'High DOM node count',
                suggestion: `${memory.domNodes} DOM nodes detected. Consider simplifying HTML structure, using virtual scrolling for large lists, and removing unnecessary elements.`
            });
        }

        if (memory.eventListeners > this.thresholds.eventListeners) {
            this.suggestions.push({
                category: 'Memory',
                severity: 'medium',
                issue: 'Many event listeners detected',
                suggestion: `Approximately ${memory.eventListeners} event listeners found. Consider using event delegation and removing unused listeners to prevent memory leaks.`
            });
        }
    }

    /**
     * Analyze CPU-related issues
     */
    analyzeCPUIssues() {
        const { cpu } = this.metrics;

        if (cpu.iterationsPerMs < this.thresholds.cpuScore) {
            this.suggestions.push({
                category: 'CPU',
                severity: 'medium',
                issue: 'Low CPU performance detected',
                suggestion: `CPU benchmark score: ${cpu.iterationsPerMs.toFixed(0)} ops/ms. Consider optimizing JavaScript execution, using Web Workers for heavy computations, and reducing synchronous operations.`
            });
        }

        if (cpu.longTasks > this.thresholds.longTasks) {
            this.suggestions.push({
                category: 'CPU',
                severity: 'high',
                issue: 'Long tasks blocking main thread',
                suggestion: `${cpu.longTasks} long tasks detected (${cpu.mainThreadBlocking.toFixed(1)}ms total blocking). Break up large JavaScript operations and use requestIdleCallback or Web Workers.`
            });
        }
    }

    /**
     * Analyze network-related issues
     */
    analyzeNetworkIssues() {
        const { network } = this.metrics;

        if (network.totalTransferSize > this.thresholds.transferSize) {
            this.suggestions.push({
                category: 'Network',
                severity: 'high',
                issue: 'Large total transfer size',
                suggestion: `${(network.totalTransferSize / 1024 / 1024).toFixed(2)}MB transferred. Enable compression, optimize images, and consider using a CDN.`
            });
        }

        if (network.totalRequests > this.thresholds.totalRequests) {
            this.suggestions.push({
                category: 'Network',
                severity: 'medium',
                issue: 'Many HTTP requests',
                suggestion: `${network.totalRequests} HTTP requests detected. Consider bundling resources, using HTTP/2, and implementing resource hints.`
            });
        }

        if (network.compressionRatio < 50 && network.totalTransferSize > 500000) {
            this.suggestions.push({
                category: 'Network',
                severity: 'medium',
                issue: 'Poor compression ratio',
                suggestion: `Compression ratio: ${network.compressionRatio.toFixed(1)}%. Enable gzip/brotli compression on your server for better performance.`
            });
        }

        if (network.cacheHitRatio < 30) {
            this.suggestions.push({
                category: 'Network',
                severity: 'low',
                issue: 'Low cache hit ratio',
                suggestion: `Cache hit ratio: ${network.cacheHitRatio.toFixed(1)}%. Implement proper cache headers and consider using a service worker for better caching.`
            });
        }
    }

    /**
     * Analyze rendering-related issues
     */
    analyzeRenderingIssues() {
        const { rendering } = this.metrics;

        if (rendering.firstContentfulPaint > this.thresholds.firstContentfulPaint) {
            this.suggestions.push({
                category: 'Rendering',
                severity: 'high',
                issue: 'Slow First Contentful Paint',
                suggestion: `FCP: ${rendering.firstContentfulPaint.toFixed(0)}ms. Optimize critical rendering path, inline critical CSS, and reduce render-blocking resources.`
            });
        }

        if (rendering.firstPaint > this.thresholds.firstPaint) {
            this.suggestions.push({
                category: 'Rendering',
                severity: 'medium',
                issue: 'Slow First Paint',
                suggestion: `FP: ${rendering.firstPaint.toFixed(0)}ms. Optimize above-the-fold content and reduce time to first byte (TTFB).`
            });
        }

        if (rendering.layoutShifts > this.thresholds.layoutShifts) {
            this.suggestions.push({
                category: 'Rendering',
                severity: 'medium',
                issue: 'Layout shifts detected',
                suggestion: `CLS: ${rendering.layoutShifts.toFixed(3)}. Set explicit dimensions for images and ads, avoid inserting content above existing content.`
            });
        }

        if (rendering.domContentLoaded > this.thresholds.domContentLoaded) {
            this.suggestions.push({
                category: 'Rendering',
                severity: 'medium',
                issue: 'Slow DOM Content Loaded',
                suggestion: `DCL: ${rendering.domContentLoaded.toFixed(0)}ms. Optimize HTML parsing by reducing DOM complexity and deferring non-critical JavaScript.`
            });
        }
    }

    /**
     * Analyze resource-related issues
     */
    analyzeResourceIssues() {
        const { resources } = this.metrics;

        if (resources.images.unoptimized > 0) {
            this.suggestions.push({
                category: 'Resources',
                severity: 'low',
                issue: 'Images without lazy loading',
                suggestion: `${resources.images.unoptimized} images without lazy loading. Add loading="lazy" attribute to improve initial page load performance.`
            });
        }

        if (resources.scripts.blocking > 0) {
            this.suggestions.push({
                category: 'Resources',
                severity: 'medium',
                issue: 'Render-blocking JavaScript',
                suggestion: `${resources.scripts.blocking} blocking scripts detected. Add async or defer attributes to non-critical JavaScript files.`
            });
        }

        if (resources.stylesheets.count > 5) {
            this.suggestions.push({
                category: 'Resources',
                severity: 'low',
                issue: 'Multiple stylesheets',
                suggestion: `${resources.stylesheets.count} separate CSS files. Consider combining stylesheets to reduce HTTP requests.`
            });
        }
    }

    /**
     * Generate comprehensive performance report
     */
    generateReport() {
        const score = this.calculatePerformanceScore();
        
        return {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            score: score,
            metrics: this.metrics,
            suggestions: this.suggestions,
            thresholds: this.thresholds
        };
    }

    /**
     * Calculate overall performance score (0-100)
     */
    calculatePerformanceScore() {
        let score = 100;
        
        // Deduct points based on issues
        this.suggestions.forEach(suggestion => {
            switch (suggestion.severity) {
                case 'high':
                    score -= 15;
                    break;
                case 'medium':
                    score -= 8;
                    break;
                case 'low':
                    score -= 3;
                    break;
            }
        });

        // Ensure score doesn't go below 0
        return Math.max(0, score);
    }

    // Helper methods
    estimateEventListeners() {
        // Rough estimation based on common patterns
        const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [onclick], [onchange], [onsubmit]');
        const elementsWithClasses = document.querySelectorAll('[class*="click"], [class*="hover"], [class*="toggle"]');
        
        return interactiveElements.length + elementsWithClasses.length;
    }

    getResourceType(url) {
        const extension = url.split('.').pop().toLowerCase().split('?')[0];
        
        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif'].includes(extension)) {
            return 'image';
        } else if (['js', 'mjs'].includes(extension)) {
            return 'script';
        } else if (['css'].includes(extension)) {
            return 'stylesheet';
        } else if (['woff', 'woff2', 'ttf', 'otf', 'eot'].includes(extension)) {
            return 'font';
        } else {
            return 'other';
        }
    }

    /**
     * Print memory usage report
     */
    printMemoryReport() {
        const { memory } = this.metrics;
        console.group('🧠 Memory Usage Report');
        console.log(`Used Heap: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Total Heap: ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Heap Limit: ${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Memory Usage: ${memory.memoryUsagePercentage?.toFixed(1) || 'N/A'}%`);
        console.log(`DOM Nodes: ${memory.domNodes}`);
        console.log(`Event Listeners: ~${memory.eventListeners}`);
        console.groupEnd();
    }

    /**
     * Print CPU performance report
     */
    printCPUReport() {
        const { cpu } = this.metrics;
        console.group('⚡ CPU Performance Report');
        console.log(`CPU Score: ${cpu.iterationsPerMs?.toFixed(0) || 'N/A'} operations/ms`);
        console.log(`Long Tasks: ${cpu.longTasks}`);
        console.log(`Main Thread Blocking: ${cpu.mainThreadBlocking?.toFixed(1) || 'N/A'}ms`);
        console.groupEnd();
    }

    /**
     * Print network performance report
     */
    printNetworkReport() {
        const { network } = this.metrics;
        console.group('🌐 Network Performance Report');
        console.log(`Total Requests: ${network.totalRequests}`);
        console.log(`Transfer Size: ${(network.totalTransferSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Compression Ratio: ${network.compressionRatio?.toFixed(1) || 'N/A'}%`);
        console.log(`Cache Hit Ratio: ${network.cacheHitRatio?.toFixed(1) || 'N/A'}%`);
        console.log('Resource Types:', network.resourceTypes);
        console.groupEnd();
    }

    /**
     * Print rendering performance report
     */
    printRenderingReport() {
        const { rendering } = this.metrics;
        console.group('🎨 Rendering Performance Report');
        console.log(`First Paint: ${rendering.firstPaint?.toFixed(0) || 'N/A'}ms`);
        console.log(`First Contentful Paint: ${rendering.firstContentfulPaint?.toFixed(0) || 'N/A'}ms`);
        console.log(`DOM Content Loaded: ${rendering.domContentLoaded?.toFixed(0) || 'N/A'}ms`);
        console.log(`Load Complete: ${rendering.loadComplete?.toFixed(0) || 'N/A'}ms`);
        console.log(`Layout Shifts: ${rendering.layoutShifts?.toFixed(3) || 'N/A'}`);
        console.groupEnd();
    }

    /**
     * Print optimization suggestions
     */
    printSuggestions() {
        console.group('💡 Optimization Suggestions');
        if (this.suggestions.length === 0) {
            console.log('🎉 No major performance issues detected!');
        } else {
            this.suggestions.forEach((suggestion, index) => {
                const icon = suggestion.severity === 'high' ? '🔴' : 
                           suggestion.severity === 'medium' ? '🟡' : '🟢';
                console.log(`${icon} ${suggestion.category}: ${suggestion.issue}`);
                console.log(`   → ${suggestion.suggestion}`);
            });
        }
        console.groupEnd();
    }
}

// Auto-run diagnostics when script loads
if (typeof window !== 'undefined') {
    window.PerformanceDiagnostics = PerformanceDiagnostics;
    
    // Global function for easy access
    window.runDiagnostics = async function() {
        const diagnostics = new PerformanceDiagnostics();
        const report = await diagnostics.init();
        
        // Print detailed reports to console
        diagnostics.printMemoryReport();
        diagnostics.printCPUReport();
        diagnostics.printNetworkReport();
        diagnostics.printRenderingReport();
        diagnostics.printSuggestions();
        
        console.log('📊 Overall Performance Score:', Math.round(report.score));
        
        return report;
    };
}

// Export for Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceDiagnostics;
}