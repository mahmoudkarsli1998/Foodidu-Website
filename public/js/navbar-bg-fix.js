// Universal Navbar Background Fix
// Ensures BG.svg is always applied to navbar across all pages

(function() {
    'use strict';
    
    // Enhanced navbar background application
    function applyNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        const nav = document.querySelector('nav');
        
        if (navbar) {
            // Method 1: Direct style application with highest priority
            navbar.style.setProperty('background', '#FFD15C', 'important');
            navbar.style.setProperty('background-image', 'url("../images/BG.svg")', 'important');
            navbar.style.setProperty('background-repeat', 'no-repeat', 'important');
            navbar.style.setProperty('background-position', 'center center', 'important');
            navbar.style.setProperty('background-size', 'cover', 'important');
            navbar.style.setProperty('backdrop-filter', 'blur(10px)', 'important');
            navbar.style.setProperty('-webkit-backdrop-filter', 'blur(10px)', 'important');
            
            // Method 2: Add CSS class for targeting
            navbar.classList.add('bg-applied');
            
            // Method 3: Set data attribute for CSS targeting
            navbar.setAttribute('data-bg-applied', 'true');
            
            console.log('✅ Navbar background applied');
        }
        
        if (nav && nav !== navbar) {
            nav.style.setProperty('background-image', 'url("../images/BG.svg")', 'important');
            nav.style.setProperty('background-size', 'cover', 'important');
        }
    }
    
    // Multiple application strategies
    function initNavbarBackgroundFix() {
        // Immediate application
        applyNavbarBackground();
        
        // DOM ready application
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', applyNavbarBackground);
        } else {
            applyNavbarBackground();
        }
        
        // Window load application
        window.addEventListener('load', applyNavbarBackground);
        
        // Delayed applications for component loading
        setTimeout(applyNavbarBackground, 100);
        setTimeout(applyNavbarBackground, 500);
        setTimeout(applyNavbarBackground, 1000);
        setTimeout(applyNavbarBackground, 2000);
        
        // Periodic application for first 15 seconds
        let forceApplyCount = 0;
        const forceApplyInterval = setInterval(() => {
            applyNavbarBackground();
            forceApplyCount++;
            if (forceApplyCount >= 5) {
                clearInterval(forceApplyInterval);
            }
        }, 3000);
        
        // Observer for navbar changes
        if (window.MutationObserver) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && 
                        (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
                        setTimeout(applyNavbarBackground, 50);
                    }
                });
            });
            
            // Start observing when navbar is found
            const checkForNavbar = setInterval(() => {
                const navbar = document.querySelector('.navbar');
                if (navbar) {
                    observer.observe(navbar, {
                        attributes: true,
                        attributeFilter: ['style', 'class']
                    });
                    clearInterval(checkForNavbar);
                }
            }, 100);
        }
        
        // Focus event application
        window.addEventListener('focus', applyNavbarBackground);
        
        // Visibility change application
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                setTimeout(applyNavbarBackground, 100);
            }
        });
    }
    
    // Initialize immediately
    initNavbarBackgroundFix();
    
    // Export for global access
    window.applyNavbarBackground = applyNavbarBackground;
    window.initNavbarBackgroundFix = initNavbarBackgroundFix;
    
})();