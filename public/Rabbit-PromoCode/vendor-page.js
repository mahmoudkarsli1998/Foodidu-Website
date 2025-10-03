// Vendor Page JavaScript Functions

// Copy promo code to clipboard
function copyPromoCode(code) {
    navigator.clipboard.writeText(code).then(function() {
        // Update button to show success
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.innerHTML;
        
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.classList.add('copied');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('copied');
        }, 2000);
        
        // Show success message
        showNotification('Promo code copied to clipboard!', 'success');
        
        // Track the copy event (if analytics is available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'promo_code_copied', {
                'event_category': 'engagement',
                'event_label': code,
                'vendor': 'rabbit'
            });
        }
    }).catch(function(err) {
        console.error('Failed to copy: ', err);
        showNotification('Failed to copy code. Please try again.', 'error');
    });
}

// Download Foodidu app
function downloadApp(platform) {
    let url = '';
    
    if (platform === 'ios') {
        url = 'https://apps.apple.com/app/foodidu'; // Replace with actual App Store URL
    } else if (platform === 'android') {
        url = 'https://play.google.com/store/apps/details?id=com.foodidu'; // Replace with actual Play Store URL
    }
    
    if (url) {
        window.open(url, '_blank');
        
        // Track download attempt
        if (typeof gtag !== 'undefined') {
            gtag('event', 'app_download_attempt', {
                'event_category': 'conversion',
                'event_label': platform,
                'source': 'vendor_page'
            });
        }
    }
}

// Open vendor app
function openVendorApp(vendor, platform) {
    let url = '';
    
    // Vendor-specific app URLs (replace with actual URLs)
    const vendorApps = {
        rabbit: {
            ios: 'https://apps.apple.com/app/rabbit',
            android: 'https://play.google.com/store/apps/details?id=com.rabbit'
        }
    };
    
    if (vendorApps[vendor] && vendorApps[vendor][platform]) {
        url = vendorApps[vendor][platform];
    }
    
    if (url) {
        window.open(url, '_blank');
        
        // Track vendor app click
        if (typeof gtag !== 'undefined') {
            gtag('event', 'vendor_app_click', {
                'event_category': 'engagement',
                'event_label': `${vendor}_${platform}`,
                'vendor': vendor
            });
        }
    }
}

// Open vendor website
function openVendorWebsite(vendor) {
    const vendorWebsites = {
        rabbit: 'https://rabbit.com' // Replace with actual website URL
    };
    
    const url = vendorWebsites[vendor];
    
    if (url) {
        window.open(url, '_blank');
        
        // Track website click
        if (typeof gtag !== 'undefined') {
            gtag('event', 'vendor_website_click', {
                'event_category': 'engagement',
                'event_label': vendor,
                'vendor': vendor
            });
        }
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;
document.head.appendChild(style);

// Mobile menu toggle (if needed)
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
    console.log('Vendor page loaded');
    
    // Track page view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': 'Vendor Page - Rabbit',
            'page_location': window.location.href
        });
    }
});