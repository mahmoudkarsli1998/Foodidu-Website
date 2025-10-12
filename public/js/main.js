// Main initialization file
import { AppState } from "./state.js";
import { showPage, toggleMenu, closeDrawer } from "./navigation.js";
import { changeSlide, goToSlide, initializeCarousel } from "./carousel.js";
import { filterDeals, getDeal, loadMoreDeals, filterDealsChip, toggleDropdown, selectFilter } from "./deals.js";
import {
  filterCategory,
  searchRestaurants,
  seeRestaurantDeals,
  loadRestaurants,
} from "./discovery.js";
import {
  filterPromos,
  copyPromoCode,
  copyPromoCodeEnhanced,
  copyRabbitCode,
} from "./promo-codes.js";
import { initializeVendorForm } from "./vendor-form.js";
import {
  initExclusiveCarousel,
  startExclusiveAutoSlide,
  stopExclusiveAutoSlide,
  changeExclusiveSlide,
  goToExclusiveSlide,
  copyExclusiveCode,
} from "./exclusive-carousel.js";
import {
  addRippleEffect,
  addRippleStyles,
  initializeSmoothScrolling,
  initializeNavbarEffects,
  initializeFeatureCardEffects,
  initializeTestimonials,
  initializeScreenshotsCarousel,
  initializeSearchInput,
  initializeScrollAnimations,
  initializeKeyboardNavigation,
  initializeWindowResize,
} from "./ui-effects.js";
import { downloadApp } from "./utils.js";

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Add ripple styles immediately
  addRippleStyles();

  // Initialize critical functionality first
  if (AppState.currentPage === "home") {
    initializeCarousel();
  }

  // Initialize other elements with slight delay to prevent blocking
  setTimeout(() => {
    initializeSmoothScrolling();
    initializeNavbarEffects();
    initializeFeatureCardEffects();
    initializeTestimonials();
    initializeScreenshotsCarousel();
    initializeVendorForm();
    initializeScrollAnimations();
    initializeKeyboardNavigation();
    initializeWindowResize();
  }, 50);

  // Add ripple effects to buttons
  document.querySelectorAll("button, .app-btn").forEach((button) => {
    addRippleEffect(button);
  });

  // Close mobile menu when clicking on links
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });

  // Initialize search input for discovery page
  initializeSearchInput();

  // Initialize exclusive carousel
  setTimeout(() => {
    initExclusiveCarousel();

    const exclusiveCarousel = document.querySelector(".exclusive-carousel");

    if (exclusiveCarousel) {
      console.log("Exclusive carousel found, adding event listeners...");

      // Pause on hover
      exclusiveCarousel.addEventListener("mouseenter", () => {
        console.log("Mouse entered, pausing auto-slide");
        stopExclusiveAutoSlide();
      });

      exclusiveCarousel.addEventListener("mouseleave", () => {
        console.log("Mouse left, resuming auto-slide");
        startExclusiveAutoSlide();
      });

      // Pause on touch (mobile)
      exclusiveCarousel.addEventListener("touchstart", () => {
        console.log("Touch started, pausing auto-slide");
        stopExclusiveAutoSlide();
      });

      exclusiveCarousel.addEventListener("touchend", () => {
        console.log("Touch ended, will resume auto-slide in 3 seconds");
        setTimeout(startExclusiveAutoSlide, 3000);
      });
    }
  }, 500);

  // Set up periodic check to ensure home components stay visible (less frequent)
  setInterval(() => {
    if (AppState.currentPage === 'home') {
      ensureHomePageComponents();
    }
  }, 5000); // Check every 5 seconds

  console.log(
    "🍕 Foodidu loaded successfully! Ready to discover amazing food deals!"
  );
});

// Prevent carousel auto-play when user is interacting
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    clearInterval(AppState.slideInterval);
  } else if (AppState.currentPage === "home") {
    initializeCarousel();
    // Ensure home components are visible when page becomes visible
    setTimeout(ensureHomePageComponents, 100);
  }
});

// Add window focus event to ensure components are visible
window.addEventListener('focus', function() {
  if (AppState.currentPage === 'home') {
    setTimeout(ensureHomePageComponents, 100);
  }
});

// Function to ensure home page components are always loaded
function ensureHomePageComponents() {
  if (AppState.currentPage !== 'home') return;
  
  const homeComponents = document.getElementById('home-components');
  if (!homeComponents) return;
  
  // List of critical sections that should always be present
  const criticalSections = [
    '.hot-promos',
    '.exclusive-deals', 
    '.features',
    '.how-it-works',
    '.vendor-invitation',
    '.app-screenshots',
    '.testimonials',
    '.cta-section'
  ];
  
  // Ensure all sections are visible
  criticalSections.forEach(selector => {
    const section = homeComponents.querySelector(selector);
    if (section) {
      section.style.display = 'block';
      section.style.opacity = '1';
      section.style.visibility = 'visible';
    }
  });
}

// Export functions for global access (for onclick handlers in HTML)
window.showPage = showPage;
window.toggleMenu = toggleMenu;
window.closeDrawer = closeDrawer;
window.ensureHomePageComponents = ensureHomePageComponents;
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;
window.filterDeals = filterDeals;
window.filterDealsChip = filterDealsChip;
window.getDeal = getDeal;
window.loadMoreDeals = loadMoreDeals;
window.toggleDropdown = toggleDropdown;
window.selectFilter = selectFilter;
window.filterCategory = filterCategory;
window.searchRestaurants = searchRestaurants;
window.seeRestaurantDeals = seeRestaurantDeals;
window.loadRestaurants = loadRestaurants;
window.filterPromos = filterPromos;
window.copyPromoCode = copyPromoCode;
window.copyPromoCodeEnhanced = copyPromoCodeEnhanced;
window.copyRabbitCode = copyRabbitCode;
window.downloadApp = downloadApp;
window.changeExclusiveSlide = changeExclusiveSlide;
window.goToExclusiveSlide = goToExclusiveSlide;
window.copyExclusiveCode = copyExclusiveCode;
