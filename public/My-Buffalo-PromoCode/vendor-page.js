// Vendor Page JavaScript Functions

// Copy promo code to clipboard
function copyPromoCode(code) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(function() {
      // Update button to show success
      const copyBtn = document.querySelector('.copy-btn');
      if (copyBtn) {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyBtn.classList.add('copied');
        
        // Reset button after 2 seconds
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.classList.remove('copied');
        }, 2000);
      }
      
      // Show success message
      showVendorNotification(`My Buffalo promo code "${code}" copied to clipboard! 🎉`, "success");
      
    }).catch(function(err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
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
        showVendorNotification(`My Buffalo promo code "${code}" copied to clipboard! 🎉`, "success");
      } catch (err) {
        alert('Promo code: ' + code);
      }
      
      document.body.removeChild(textArea);
    });
  } else {
    // Fallback for very old browsers
    alert('Promo code: ' + code);
  }
}

// Open vendor app
function openVendorApp(vendor, platform) {
  let url = "";

  const vendorApps = {
    "my-buffalo": {
      ios: "https://apps.apple.com/eg/app/my-buffalo/id123456792",
      android: "https://play.google.com/store/apps/details?id=com.mybuffalo.eg",
    },
  };

  if (vendorApps[vendor] && vendorApps[vendor][platform]) {
    url = vendorApps[vendor][platform];
  }

  if (url) {
    window.open(url, "_blank");

    if (typeof gtag !== "undefined") {
      gtag("event", "vendor_app_click", {
        event_category: "engagement",
        event_label: `${vendor}_${platform}`,
        vendor: vendor,
      });
    }
  }
}

// Open vendor website
function openVendorWebsite(vendor) {
  const vendorWebsites = {
    "my-buffalo": "https://www.mybuffalo.com.eg/",
  };

  const url = vendorWebsites[vendor];

  if (url) {
    window.open(url, "_blank");

    if (typeof gtag !== "undefined") {
      gtag("event", "vendor_website_click", {
        event_category: "engagement",
        event_label: vendor,
        vendor: vendor,
      });
    }
  }
}

// Vendor Notification Function
function showVendorNotification(message, type = "info") {
  // Create container if not exist
  let container = document.querySelector(".vendor-notification-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "vendor-notification-container";
    document.body.appendChild(container);
  }

  // Create notification
  const notification = document.createElement("div");
  notification.className = `vendor-notification ${type}`;
  notification.innerHTML = `
    <button class="close-btn">&times;</button>
    <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
    <span>${message}</span>
  `;

  container.appendChild(notification);

  // Animate in
  requestAnimationFrame(() => notification.classList.add("show"));

  // Auto dismiss after 3 seconds
  const timeout = setTimeout(() => dismissNotification(notification), 3000);

  // Close button
  notification.querySelector(".close-btn").addEventListener("click", () => {
    clearTimeout(timeout);
    dismissNotification(notification);
  });

  // Enable drag-to-dismiss
  makeDraggableDismiss(notification, timeout);
}

// Dismiss logic
function dismissNotification(notification) {
  notification.classList.remove("show");
  notification.classList.add("hide");
  setTimeout(() => notification.remove(), 400);
}

// Draggable dismiss helper
function makeDraggableDismiss(el, timeout) {
  let startX = 0, currentX = 0, dragging = false;

  el.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    dragging = true;
    el.style.transition = "none";
    clearTimeout(timeout);
  });

  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    currentX = e.clientX - startX;
    el.style.transform = `translateX(${currentX}px)`;
    el.style.opacity = `${1 - Math.abs(currentX) / 200}`;
  });

  window.addEventListener("mouseup", () => {
    if (!dragging) return;
    dragging = false;
    el.style.transition = "all 0.3s ease";

    if (Math.abs(currentX) > 100) {
      el.style.transform = `translateX(${currentX > 0 ? 400 : -400}px)`;
      el.style.opacity = "0";
      setTimeout(() => el.remove(), 300);
    } else {
      el.style.transform = "";
      el.style.opacity = "";
    }
  });
}

// Mobile menu toggle
function toggleMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const overlay = document.querySelector('.drawer-overlay');
  
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  overlay.classList.toggle('active');
}

function closeDrawer() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const overlay = document.querySelector('.drawer-overlay');
  
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  overlay.classList.remove('active');
}

// Inject styles
const style = document.createElement("style");
style.textContent = `
.vendor-notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
}

.vendor-notification {
  position: relative;
  background: #3b82f6;
  color: #fff;
  padding: 14px 18px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 320px;
  cursor: grab;
}

.vendor-notification.show {
  opacity: 1;
  transform: translateX(0);
}

.vendor-notification.hide {
  opacity: 0;
  transform: translateX(100%);
}

.vendor-notification.success { background: #059669; }
.vendor-notification.error { background: #dc2626; }
.vendor-notification.info { background: #3b82f6; }

.vendor-notification .close-btn {
  position: absolute;
  top: 6px;
  right: 10px;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
}
.vendor-notification .close-btn:hover {
  opacity: 1;
}
`;
document.head.appendChild(style);

// Navbar background fix
function forceNavbarBackground() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.style.setProperty('background', '#FFD15C', 'important');
    navbar.style.setProperty('background-image', 'url("../images/BG.svg")', 'important');
    navbar.style.setProperty('background-size', 'cover', 'important');
    navbar.style.setProperty('background-repeat', 'no-repeat', 'important');
    navbar.style.setProperty('background-position', 'center center', 'important');
  }
}

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  console.log("My Buffalo vendor page loaded");
  
  // Apply navbar background immediately and repeatedly
  forceNavbarBackground();
  setTimeout(forceNavbarBackground, 100);
  setTimeout(forceNavbarBackground, 500);
  setTimeout(forceNavbarBackground, 1000);

  if (typeof gtag !== "undefined") {
    gtag("event", "page_view", {
      page_title: "Vendor Page - My Buffalo",
      page_location: window.location.href,
    });
  }

  // Ensure downloadApp() is available to show the Coming Soon modal
  if (typeof window.downloadApp !== 'function') {
    window.downloadApp = function () {
      if (typeof window.showComingSoonModal === 'function') {
        window.showComingSoonModal();
      } else {
        alert('Foodidu App is coming soon!');
      }
    };
  }

  // Wire only the Foodidu App group's buttons
  try {
    document.querySelectorAll('.app-group').forEach(group => {
      const heading = group.querySelector('h3');
      if (heading && /Foodidu\s+App/i.test(heading.textContent)) {
        group.querySelectorAll('a.download-btn.app-store, a.download-btn.google-play').forEach(a => {
          a.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof window.downloadApp === 'function') {
              window.downloadApp();
            }
          });
        });
      }
    });
  } catch (err) {
    console.warn('Failed to bind Foodidu App download buttons:', err);
  }

  // Fallback: ensure close function exists
  if (typeof window.closeComingSoonModal !== 'function') {
    window.closeComingSoonModal = function () {
      var modal = document.getElementById('coming-soon-modal');
      if (modal) {
        try { modal.parentNode && modal.parentNode.removeChild(modal); } catch (_) {}
      }
      try { document.body.classList.remove('modal-open'); } catch (_) {}
    };
  }

  // Capture-phase close for overlay/close button
  const modalCaptureCloser = function(e) {
    const t = e.target;
    if (!t) return;
    if ((t.closest && (t.closest('.coming-soon-overlay') || t.closest('.coming-soon-close'))) || t.classList.contains('coming-soon-overlay')) {
      try { e.stopPropagation(); } catch (_) {}
      try { if (e.cancelable) e.preventDefault(); } catch (_) {}
      window.closeComingSoonModal();
    }
  };
  window.addEventListener('click', modalCaptureCloser, true);
});