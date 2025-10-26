/**
 * 🔧 Vendor Pages Menu Fix
 * Ensures hamburger menu works properly on all vendor pages
 */

(function() {
    'use strict';
    
    console.log('🔧 Loading vendor menu fix...');
    
    // Enhanced menu toggle function
    function toggleMenu() {
        console.log('🍔 Toggle menu clicked');
        
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const overlay = document.querySelector('.drawer-overlay');
        
        if (hamburger) {
            hamburger.classList.toggle('active');
            console.log('✅ Hamburger toggled:', hamburger.classList.contains('active'));
        }
        
        if (navMenu) {
            navMenu.classList.toggle('active');
            console.log('✅ Nav menu toggled:', navMenu.classList.contains('active'));
        }
        
        if (overlay) {
            overlay.classList.toggle('active');
            console.log('✅ Overlay toggled:', overlay.classList.contains('active'));
        }
        
        // Prevent body scroll when menu is open
        if (navMenu && navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Enhanced close drawer function
    function closeDrawer() {
        console.log('❌ Close drawer called');
        
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const overlay = document.querySelector('.drawer-overlay');
        
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    // Make functions globally available
    window.toggleMenu = toggleMenu;
    window.closeDrawer = closeDrawer;
    
    // Enhanced downloadApp function
    window.downloadApp = function() {
        console.log('📱 Download app clicked');
        if (typeof window.showComingSoonModal === 'function') {
            window.showComingSoonModal();
        } else {
            alert('📱 Foodidu App is coming soon!');
        }
    };
    
    // Initialize when DOM is ready
    function initializeMenu() {
        console.log('🚀 Initializing vendor menu...');
        
        // Ensure hamburger has click handler
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            // Remove any existing listeners
            hamburger.removeEventListener('click', toggleMenu);
            // Add new listener
            hamburger.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleMenu();
            });
            console.log('✅ Hamburger click handler attached');
        } else {
            console.warn('⚠️ Hamburger element not found');
        }
        
        // Ensure overlay has click handler
        const overlay = document.querySelector('.drawer-overlay');
        if (overlay) {
            overlay.removeEventListener('click', closeDrawer);
            overlay.addEventListener('click', closeDrawer);
            console.log('✅ Overlay click handler attached');
        }
        
        // Add escape key handler
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeDrawer();
            }
        });
        
        // Ensure menu items work
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Close menu when link is clicked
                setTimeout(closeDrawer, 100);
            });
        });
        
        console.log('✅ Vendor menu initialization complete');
    }
    
    // Initialize immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeMenu);
    } else {
        initializeMenu();
    }
    
    // Also initialize after a short delay to ensure all elements are loaded
    setTimeout(initializeMenu, 500);
    
})();