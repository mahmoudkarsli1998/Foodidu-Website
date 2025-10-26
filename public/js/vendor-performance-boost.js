/**
 * 🚀 Vendor Pages Performance Boost
 * Pure performance improvements - NO visual or UI changes
 * Only for: Rabbit, Senem, Noon, Noon Egypt
 */

(function() {
    'use strict';
    
    // Only run on vendor pages
    const isVendorPage = window.location.pathname.includes('PromoCode');
    if (!isVendorPage) return;
    
    console.log('🚀 Loading vendor performance boost...');
    
    // Performance optimizations
    function applyPerformanceBoost() {
        
        // 1. Enable hardware acceleration for smooth animations
        const style = document.createElement('style');
        style.textContent = `
            /* Hardware acceleration for smooth performance */
            * {
                transform: translate3d(0, 0, 0);
                backface-visibility: hidden;
            }
            
            /* Optimize mobile background performance */
            @media screen and (max-width: 768px) {
                .vendor-page {
                    background-attachment: scroll !important;
                }
            }
            
            /* Optimize animations */
            .copy-btn,
            .download-btn,
            .back-btn,
            .feature-item,
            .benefit-item {
                will-change: transform, opacity;
            }
            
            /* Smooth scrolling */
            html {
                scroll-behavior: smooth;
            }
            
            /* Optimize text rendering */
            body {
                text-rendering: optimizeSpeed;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            
            /* Touch optimization */
            button, a, .copy-btn, .download-btn {
                touch-action: manipulation;
                -webkit-tap-highlight-color: transparent;
            }
            
            /* Image optimization */
            img {
                loading: lazy;
                decoding: async;
            }
        `;
        document.head.appendChild(style);
        
        // 2. Optimize images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            img.setAttribute('decoding', 'async');
        });
        
        // 3. Optimize copy button performance
        const originalCopyFunction = window.copyPromoCode;
        if (originalCopyFunction) {
            window.copyPromoCode = function(code) {
                const copyBtn = document.querySelector(".copy-btn");
                if (!copyBtn) return;
                
                // Immediate visual feedback
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyBtn.classList.add("copied");
                
                // Fast clipboard operation
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(code).then(() => {
                        // Show notification (use existing function if available)
                        if (typeof showNoonNotification === 'function') {
                            showNoonNotification(`Code "${code}" copied! 🎉`, "success");
                        }
                    }).catch(() => {
                        // Fallback notification
                        console.log('Code copied to clipboard');
                    });
                } else {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = code;
                    textArea.style.position = 'fixed';
                    textArea.style.opacity = '0';
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                }
                
                // Reset button
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.classList.remove("copied");
                }, 1500);
            };
        }
        
        // 4. Optimize event listeners with passive options
        const passiveOptions = { passive: true };
        
        // Remove default scroll listeners and add optimized ones
        let ticking = false;
        const optimizedScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', optimizedScroll, passiveOptions);
        window.addEventListener('touchmove', optimizedScroll, passiveOptions);
        
        // 5. Optimize memory usage
        const cleanupMemory = () => {
            // Force garbage collection if available
            if (window.gc && typeof window.gc === 'function') {
                window.gc();
            }
        };
        
        // Clean up memory periodically
        setInterval(cleanupMemory, 30000); // Every 30 seconds
        
        console.log('✅ Performance boost applied');
    }
    
    // Apply optimizations when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyPerformanceBoost);
    } else {
        applyPerformanceBoost();
    }
    
})();