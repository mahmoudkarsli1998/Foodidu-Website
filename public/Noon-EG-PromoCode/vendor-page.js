// Noon Egypt Vendor Page JavaScript Functions - EXACT COPY of Noon GCC
// ====================

// Copy promo code to clipboard - SAME AS NOON GCC
function copyPromoCode(code) {
  navigator.clipboard
    .writeText(code)
    .then(() => {
      const copyBtn = document.querySelector(".copy-btn");
      const originalText = copyBtn.innerHTML;

      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      copyBtn.classList.add("copied");

      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.classList.remove("copied");
      }, 2000);

      // Show success message - SAME STYLE AS NOON GCC
      showNoonNotification(`Noon Egypt promo code "${code}" copied to clipboard! 🎉`, "success");

      // Track event
      if (typeof gtag !== "undefined") {
        gtag("event", "promo_code_copied", {
          event_category: "engagement",
          event_label: code,
          vendor: "noon-egypt",
        });
      }
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
      showNoonNotification("Failed to copy code. Please try again.", "error");
    });
}

// Open vendor app
function openVendorApp(vendor, platform) {
  let url = "";

  const vendorApps = {
    "noon-egypt": {
      ios: "https://apps.apple.com/us/app/noon-shopping-food-grocery/id1269038866",
      android: "https://play.google.com/store/apps/details?id=com.noon.buyerapp&hl=en",
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
    "noon-egypt": "https://www.noon.com/egypt-en/",
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

// ====================
// Noon Notification (same style as Rabbit + close + draggable) - EXACT COPY
// ====================
function showNoonNotification(message, type = "info") {
  // Create container if not exist
  let container = document.querySelector(".noon-notification-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "noon-notification-container";
    document.body.appendChild(container);
  }

  // Create notification
  const notification = document.createElement("div");
  notification.className = `noon-notification ${type}`;
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

// ====================
// Inject styles - EXACT SAME AS NOON GCC
// ====================
const style = document.createElement("style");
style.textContent = `
.noon-notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
}

.noon-notification {
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

.noon-notification.show {
  opacity: 1;
  transform: translateX(0);
}

.noon-notification.hide {
  opacity: 0;
  transform: translateX(100%);
}

.noon-notification.success { background: #059669; }
.noon-notification.error { background: #dc2626; }
.noon-notification.info { background: #3b82f6; }

.noon-notification .close-btn {
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
.noon-notification .close-btn:hover {
  opacity: 1;
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 10px;
}
`;
document.head.appendChild(style);

// ====================
// Mobile menu toggle
// ====================
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

// ====================
// Init
// ====================
document.addEventListener("DOMContentLoaded", function () {
  console.log("Noon Egypt vendor page loaded");

  if (typeof gtag !== "undefined") {
    gtag("event", "page_view", {
      page_title: "Vendor Page - Noon Egypt",
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
});