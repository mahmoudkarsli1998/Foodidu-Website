/**
 * 🍔 Simple Menu Fix - Direct and Immediate
 * This will definitely work for hamburger menu
 */

console.log('🍔 Simple menu fix loading...');

// Define functions immediately
window.toggleMenu = function() {
    console.log('🍔 toggleMenu called!');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.drawer-overlay');
    
    console.log('Elements found:', {
        hamburger: !!hamburger,
        navMenu: !!navMenu,
        overlay: !!overlay
    });
    
    if (hamburger) {
        hamburger.classList.toggle('active');
        console.log('Hamburger active:', hamburger.classList.contains('active'));
    }
    
    if (navMenu) {
        navMenu.classList.toggle('active');
        console.log('Nav menu active:', navMenu.classList.contains('active'));
    }
    
    if (overlay) {
        overlay.classList.toggle('active');
        console.log('Overlay active:', overlay.classList.contains('active'));
    }
    
    // Prevent body scroll when menu is open
    if (navMenu && navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
};

window.closeDrawer = function() {
    console.log('❌ closeDrawer called!');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.drawer-overlay');
    
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    
    document.body.style.overflow = '';
};

window.downloadApp = function() {
    console.log('📱 downloadApp called!');
    if (typeof window.showComingSoonModal === 'function') {
        window.showComingSoonModal();
    } else {
        alert('📱 Foodidu App is coming soon!');
    }
};

// Copy promo code function
window.copyPromoCode = function(code) {
    console.log('📋 copyPromoCode called with:', code);
    
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

// Simple notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.simple-notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `simple-notification ${type}`;
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
        max-width: 300px;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Vendor website function
window.openVendorWebsite = function(vendor) {
    console.log('🌐 openVendorWebsite called with:', vendor);
    
    const vendorWebsites = {
        rabbit: "https://www.rabbitmart.com/us/",
        senem: "https://www.senem-eg.com/",
        noon: "https://www.noon.com/",
        "noon-egypt": "https://www.noon.com/egypt-en/"
    };
    
    const url = vendorWebsites[vendor];
    if (url) {
        window.open(url, "_blank");
    }
};

// Also add event listeners as backup
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM loaded, setting up menu...');
    
    // Add click listener to hamburger as backup
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🍔 Hamburger clicked via event listener!');
            window.toggleMenu();
        });
        console.log('✅ Hamburger event listener added');
    } else {
        console.warn('⚠️ Hamburger not found');
    }
    
    // Add click listener to overlay
    const overlay = document.querySelector('.drawer-overlay');
    if (overlay) {
        overlay.addEventListener('click', function() {
            console.log('🔄 Overlay clicked!');
            window.closeDrawer();
        });
        console.log('✅ Overlay event listener added');
    }
    
    // Add escape key listener
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            window.closeDrawer();
        }
    });
    
    console.log('✅ Menu setup complete');
});

// Force setup after a delay too
setTimeout(function() {
    console.log('🔄 Force setup after delay...');
    
    const hamburger = document.querySelector('.hamburger');
    if (hamburger && !hamburger.hasAttribute('data-setup')) {
        hamburger.setAttribute('data-setup', 'true');
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🍔 Hamburger clicked via delayed setup!');
            window.toggleMenu();
        });
        console.log('✅ Delayed hamburger setup complete');
    }
}, 1000);

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .copy-btn.copied {
        background: #10b981 !important;
        transform: scale(1.05);
        transition: all 0.3s ease;
    }
    
    .simple-notification .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;
document.head.appendChild(style);

console.log('✅ Simple menu fix loaded successfully');