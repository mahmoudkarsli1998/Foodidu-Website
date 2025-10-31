// Universal Navbar Background Fix Script - EXACT HOME PAGE IMPLEMENTATION
// Ensures BG.svg background displays on all vendor pages exactly like home page

(function() {
    'use strict';
    
    // Apply navbar background with EXACT home page styling
    function applyNavbarBackground() {
        const navbars = document.querySelectorAll('.navbar, nav, header, [class*="nav"]');
        
        navbars.forEach(navbar => {
            if (navbar) {
                // EXACT HOME PAGE STYLING - Method 1: Direct style application
                navbar.style.setProperty('position', 'fixed', 'important');
                navbar.style.setProperty('top', '0', 'important');
                navbar.style.setProperty('width', '100%', 'important');
                navbar.style.setProperty('background', '#FFD15C', 'important');
                navbar.style.setProperty('background-image', 'url("../images/BG.svg")', 'important');
                navbar.style.setProperty('background-repeat', 'no-repeat', 'important');
                navbar.style.setProperty('background-position', 'center center', 'important');
                navbar.style.setProperty('background-size', 'cover', 'important');
                navbar.style.setProperty('backdrop-filter', 'blur(10px)', 'important');
                navbar.style.setProperty('-webkit-backdrop-filter', 'blur(10px)', 'important');
                navbar.style.setProperty('box-shadow', '0 2px 20px rgba(0, 0, 0, 0.1)', 'important');
                navbar.style.setProperty('z-index', '1000', 'important');
                navbar.style.setProperty('transition', 'all 0.3s ease', 'important');
                
                // Method 2: Add CSS classes for targeting
                navbar.classList.add('bg-applied');
                navbar.setAttribute('data-bg-applied', 'true');
                
                // Method 3: Force remove any conflicting styles
                navbar.style.removeProperty('background-color');
                navbar.style.removeProperty('background-attachment');
                
                // Method 4: Ensure ::before pseudo-element works
                if (!navbar.querySelector('.navbar-bg-pseudo')) {
                    const pseudoElement = document.createElement('div');
                    pseudoElement.className = 'navbar-bg-pseudo';
                    pseudoElement.style.cssText = `
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: url('../images/BG.svg') center center/cover no-repeat;
                        z-index: -1;
                        opacity: 0.9;
                        pointer-events: none;
                    `;
                    navbar.appendChild(pseudoElement);
                }
            }
        });
        
        // Force CSS injection for maximum compatibility
        injectNavbarCSS();
    }
    
    // Inject CSS directly into the page
    function injectNavbarCSS() {
        if (!document.getElementById('navbar-bg-fix-css')) {
            const style = document.createElement('style');
            style.id = 'navbar-bg-fix-css';
            style.textContent = `
                /* FORCE NAVBAR BACKGROUND - EXACT HOME PAGE IMPLEMENTATION */
                .navbar {
                    position: fixed !important;
                    top: 0 !important;
                    width: 100% !important;
                    background: #FFD15C !important;
                    background-image: url('../images/BG.svg') !important;
                    background-repeat: no-repeat !important;
                    background-position: center center !important;
                    background-size: cover !important;
                    backdrop-filter: blur(10px) !important;
                    -webkit-backdrop-filter: blur(10px) !important;
                    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1) !important;
                    z-index: 1000 !important;
                    transition: all 0.3s ease !important;
                }
                
                .navbar::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('../images/BG.svg') center center/cover no-repeat;
                    z-index: -1;
                    opacity: 0.9;
                }
                
                nav.navbar, .navbar, nav, header.navbar, [class*="navbar"] {
                    background: #FFD15C !important;
                    background-image: url('../images/BG.svg') !important;
                    background-repeat: no-repeat !important;
                    background-position: center center !important;
                    background-size: cover !important;
                }
                
                html body .navbar, html body nav.navbar, html body header.navbar {
                    background: #FFD15C !important;
                    background-image: url('../images/BG.svg') !important;
                    background-size: cover !important;
                    background-repeat: no-repeat !important;
                    background-position: center center !important;
                    background-attachment: scroll !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Apply immediately
    applyNavbarBackground();
    
    // Apply on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyNavbarBackground);
    }
    
    // Apply on window load
    window.addEventListener('load', applyNavbarBackground);
    
    // Apply with delays to catch late-loading elements
    setTimeout(applyNavbarBackground, 100);
    setTimeout(applyNavbarBackground, 500);
    setTimeout(applyNavbarBackground, 1000);
    setTimeout(applyNavbarBackground, 2000);
    
    // Periodic application for first 15 seconds
    let attempts = 0;
    const maxAttempts = 30; // 15 seconds with 500ms intervals
    
    const intervalId = setInterval(() => {
        applyNavbarBackground();
        attempts++;
        
        if (attempts >= maxAttempts) {
            clearInterval(intervalId);
        }
    }, 500);
    
    // MutationObserver to catch dynamically added navbar elements
    if (window.MutationObserver) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            if (node.matches && (node.matches('.navbar') || node.matches('nav') || node.matches('header'))) {
                                setTimeout(applyNavbarBackground, 50);
                            }
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Stop observing after 30 seconds
        setTimeout(() => {
            observer.disconnect();
        }, 30000);
    }
    
    // Apply on focus and visibility change events
    window.addEventListener('focus', applyNavbarBackground);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            applyNavbarBackground();
        }
    });
    
    // Force application on scroll (first few scrolls)
    let scrollCount = 0;
    const maxScrollApplies = 5;
    
    window.addEventListener('scroll', function scrollHandler() {
        if (scrollCount < maxScrollApplies) {
            applyNavbarBackground();
            scrollCount++;
        } else {
            window.removeEventListener('scroll', scrollHandler);
        }
    });
    
})();