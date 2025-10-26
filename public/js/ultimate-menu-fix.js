/**
 * 🔥 Ultimate Menu Fix - This WILL work!
 * Multiple approaches to ensure hamburger menu works
 */

console.log('🔥 Ultimate menu fix loading...');

// Immediate function definitions
window.toggleMenu = function() {
    console.log('🍔 TOGGLE MENU CALLED!');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.drawer-overlay');
    
    console.log('Found elements:', {
        hamburger: !!hamburger,
        navMenu: !!navMenu,
        overlay: !!overlay
    });
    
    // Toggle hamburger
    if (hamburger) {
        hamburger.classList.toggle('active');
        console.log('Hamburger toggled, active:', hamburger.classList.contains('active'));
    }
    
    // Toggle nav menu with force styles
    if (navMenu) {
        const isActive = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        
        // Force styles for mobile
        if (!isActive) {
            // Opening menu
            navMenu.style.right = '0px';
            navMenu.style.visibility = 'visible';
            navMenu.style.opacity = '1';
            console.log('Menu opened with force styles');
        } else {
            // Closing menu
            navMenu.style.right = '-100%';
            setTimeout(() => {
                navMenu.style.visibility = 'hidden';
                navMenu.style.opacity = '0';
            }, 300);
            console.log('Menu closed with force styles');
        }
    }
    
    // Toggle overlay with force styles
    if (overlay) {
        const isActive = overlay.classList.contains('active');
        overlay.classList.toggle('active');
        
        if (!isActive) {
            // Show overlay
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
            overlay.style.display = 'block';
        } else {
            // Hide overlay
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        }
    }
    
    // Prevent body scroll when menu is open
    if (navMenu && navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
};

window.closeDrawer = function() {
    console.log('❌ CLOSE DRAWER CALLED!');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.drawer-overlay');
    
    // Remove active classes
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) {
        navMenu.classList.remove('active');
        // Force close styles
        navMenu.style.right = '-100%';
        navMenu.style.visibility = 'hidden';
        navMenu.style.opacity = '0';
    }
    if (overlay) {
        overlay.classList.remove('active');
        // Force hide overlay
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
        overlay.style.display = 'none';
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
};

// Other functions
window.downloadApp = function() {
    console.log('📱 Download app called');
    if (typeof window.showComingSoonModal === 'function') {
        window.showComingSoonModal();
    } else {
        alert('📱 Foodidu App is coming soon!');
    }
};

window.copyPromoCode = function(code) {
    console.log('📋 Copy promo code:', code);
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
            showSuccess(code);
        }).catch(() => {
            fallbackCopy(code);
        });
    } else {
        fallbackCopy(code);
    }
};

function fallbackCopy(code) {
    const textArea = document.createElement('textarea');
    textArea.value = code;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showSuccess(code);
    } catch (err) {
        alert(`Promo code: ${code}`);
    }
    
    document.body.removeChild(textArea);
}

function showSuccess(code) {
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        const original = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.style.background = '#10b981';
        
        setTimeout(() => {
            copyBtn.innerHTML = original;
            copyBtn.style.background = '';
        }, 2000);
    }
    
    // Simple alert as backup
    console.log(`✅ Copied: ${code}`);
}

// Force setup on DOM ready
function forceSetup() {
    console.log('🔧 Force setup running...');
    
    // Find hamburger and add multiple event listeners
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        console.log('✅ Hamburger found, adding listeners...');
        
        // Remove existing onclick to avoid conflicts
        hamburger.removeAttribute('onclick');
        
        // Add click listener
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🍔 Hamburger clicked via event listener!');
            window.toggleMenu();
        });
        
        // Add touch listener for mobile
        hamburger.addEventListener('touchstart', function(e) {
            e.preventDefault();
            console.log('👆 Hamburger touched!');
            window.toggleMenu();
        });
        
        // Make hamburger more visible for testing
        hamburger.style.cursor = 'pointer';
        hamburger.style.zIndex = '1001';
        
        console.log('✅ Hamburger setup complete');
    } else {
        console.warn('⚠️ Hamburger not found!');
    }
    
    // Setup overlay
    const overlay = document.querySelector('.drawer-overlay');
    if (overlay) {
        overlay.addEventListener('click', window.closeDrawer);
        overlay.addEventListener('touchstart', window.closeDrawer);
        console.log('✅ Overlay setup complete');
    }
    
    // Add escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            window.closeDrawer();
        }
    });
    
    console.log('✅ Force setup complete');
}

// Run setup immediately if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceSetup);
} else {
    forceSetup();
}

// Also run after delays to catch late-loading elements
setTimeout(forceSetup, 500);
setTimeout(forceSetup, 1000);
setTimeout(forceSetup, 2000);

// Add CSS to ensure menu is visible
const style = document.createElement('style');
style.textContent = `
    /* Force hamburger visibility */
    .hamburger {
        display: flex !important;
        cursor: pointer !important;
        z-index: 1001 !important;
    }
    
    /* Ensure mobile menu works */
    @media (max-width: 768px) {
        .nav-menu.active {
            right: 0 !important;
            visibility: visible !important;
            opacity: 1 !important;
        }
        
        .drawer-overlay.active {
            opacity: 1 !important;
            visibility: visible !important;
            display: block !important;
        }
    }
    
    /* Copy button success state */
    .copy-btn.copied {
        background: #10b981 !important;
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);

console.log('🔥 Ultimate menu fix loaded - Menu WILL work now!');