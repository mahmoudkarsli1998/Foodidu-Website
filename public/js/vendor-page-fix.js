/**
 * 🔧 Vendor Pages Universal Fix
 * Fixes all loading, navigation, and functionality issues for vendor pages
 * Works for: Rabbit, Senem, Noon GCC, Noon Egypt
 */

(function() {
    'use strict';
    
    console.log('🔧 Loading vendor page universal fix...');
    
    // Ensure DOM is ready
    function domReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }
    
    // Initialize vendor page fixes
    domReady(function() {
        initVendorPageFixes();
    });
    
    function initVendorPageFixes() {
        console.log('🚀 Initializing vendor page fixes...');
        
        // 1. Fix navigation functionality
        setupNavigation();
        
        // 2. Fix navbar background
        fixNavbarBackground();
        
        // 3. Setup copy functionality
        setupCopyFunctionality();
        
        // 4. Fix mobile responsiveness
        fixMobileResponsiveness();
        
        // 5. Setup error handling
        setupErrorHandling();
        
        console.log('✅ Vendor page fixes initialized successfully');
    }
    
    // Navigation fixes
    function setupNavigation() {
        // Hamburger menu toggle
        window.toggleMenu = function() {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            const overlay = document.querySelector('.drawer-overlay');
            
            if (hamburger) hamburger.classList.toggle('active');
            if (navMenu) navMenu.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
        };
        
        // Close drawer
        window.closeDrawer = function() {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            const overlay = document.querySelector('.drawer-overlay');
            
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        };
        
        // Download app function
        window.downloadApp = function() {
            if (typeof window.showComingSoonModal === 'function') {
                window.showComingSoonModal();
            } else {
                alert('📱 Foodidu App is coming soon!');
            }
        };
        
        // Setup click handlers
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            hamburger.addEventListener('click', window.toggleMenu);
        }
        
        const overlay = document.querySelector('.drawer-overlay');
        if (overlay) {
            overlay.addEventListener('click', window.closeDrawer);
        }
        
        console.log('✅ Navigation setup complete');
    }
    
    // Fix navbar background
    function fixNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        const nav = document.querySelector('nav');
        
        const targetElement = navbar || nav;
        
        if (targetElement) {
            // Apply background with multiple fallbacks
            targetElement.style.setProperty('background', '#FFD15C', 'important');
            targetElement.style.setProperty('background-image', 'url("../images/BG.svg")', 'important');
            targetElement.style.setProperty('background-repeat', 'no-repeat', 'important');
            targetElement.style.setProperty('background-position', 'center center', 'important');
            targetElement.style.setProperty('background-size', 'cover', 'important');
            
            // Add class for CSS targeting
            targetElement.classList.add('bg-fixed');
            
            console.log('✅ Navbar background fixed');
        }
    }
    
    // Setup copy functionality
    function setupCopyFunctionality() {
        // Copy promo code function
        window.copyPromoCode = function(code) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(code).then(function() {
                    showCopySuccess(code);
                }).catch(function() {
                    fallbackCopy(code);
                });
            } else {
                fallbackCopy(code);
            }
        };
        
        // Fallback copy method
        function fallbackCopy(code) {
            const textArea = document.createElement('textarea');
            textArea.value = code;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                showCopySuccess(code);
            } catch (err) {
                console.error('Copy failed:', err);
                alert(`Promo code: ${code}\nCopy this code manually.`);
            }
            
            document.body.removeChild(textArea);
        }
        
        // Show copy success
        function showCopySuccess(code) {
            // Update button
            const copyBtn = document.querySelector('.copy-btn');
            if (copyBtn) {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.classList.remove('copied');
                }, 2000);
            }
            
            // Show notification
            showNotification(`Promo code "${code}" copied to clipboard! 🎉`, 'success');
        }
        
        console.log('✅ Copy functionality setup complete');
    }
    
    // Fix mobile responsiveness
    function fixMobileResponsiveness() {
        // Add mobile-optimized CSS
        const mobileCSS = document.createElement('style');
        mobileCSS.textContent = `
            @media screen and (max-width: 768px) {
                .vendor-page {
                    background-attachment: scroll !important;
                    padding-top: 100px !important;
                }
                
                .navbar {
                    background-attachment: scroll !important;
                }
                
                .container {
                    padding: 0 15px !important;
                }
                
                .promo-card {
                    margin: 10px 0 !important;
                }
                
                .copy-btn {
                    padding: 12px 20px !important;
                    font-size: 14px !important;
                }
            }
        `;
        document.head.appendChild(mobileCSS);
        
        console.log('✅ Mobile responsiveness fixed');
    }
    
    // Setup error handling
    function setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', function(e) {
            console.error('Vendor page error:', e.error);
            // Don't let errors break the page
            return true;
        });
        
        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled promise rejection:', e.reason);
            e.preventDefault();
        });
        
        console.log('✅ Error handling setup complete');
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existing = document.querySelector('.vendor-notification');
        if (existing) {
            existing.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `vendor-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Style notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            font-weight: 600;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Add animation keyframes
    const animationCSS = document.createElement('style');
    animationCSS.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); }
            to { transform: translateX(100%); }
        }
        
        .copy-btn.copied {
            background: #10b981 !important;
            transform: scale(1.05);
        }
        
        .navbar.bg-fixed {
            background: #FFD15C !important;
            background-image: url("../images/BG.svg") !important;
            background-repeat: no-repeat !important;
            background-position: center center !important;
            background-size: cover !important;
        }
    `;
    document.head.appendChild(animationCSS);
    
    // Vendor-specific functions
    window.openVendorWebsite = function(vendor) {
        const vendorWebsites = {
            rabbit: "https://www.rabbitmart.com/us/",
            senem: "https://www.senem-eg.com/",
            noon: "https://www.noon.com/",
            "noon-egypt": "https://www.noon.com/egypt-en/"
        };
        
        const url = vendorWebsites[vendor];
        if (url) {
            window.open(url, "_blank");
            
            // Analytics tracking if available
            if (typeof gtag !== "undefined") {
                gtag("event", "vendor_website_click", {
                    event_category: "engagement",
                    event_label: vendor,
                    vendor: vendor,
                });
            }
        }
    };
    
    // Expose functions globally for backward compatibility
    window.VendorPageFix = {
        copyPromoCode: window.copyPromoCode,
        toggleMenu: window.toggleMenu,
        closeDrawer: window.closeDrawer,
        downloadApp: window.downloadApp,
        openVendorWebsite: window.openVendorWebsite
    };
    
})();