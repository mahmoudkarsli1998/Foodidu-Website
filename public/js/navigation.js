// Navigation Functions
import { AppState } from './state.js';
import { showLoadingSpinner, hideLoadingSpinner } from './utils.js';
import { initializeCarousel } from './carousel.js';
import { loadDeals } from './deals.js';
import { loadRestaurants } from './discovery.js';
import { loadPromoCodes } from './promo-codes.js';
import { animateCounters } from './utils.js';

export function showPage(pageId) {
    showLoadingSpinner();
    
    setTimeout(() => {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        document.getElementById(pageId).classList.add('active');
        AppState.currentPage = pageId;
        
        // Close mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const overlay = document.querySelector('.drawer-overlay');
        
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        
        // Initialize page-specific content
        initializePage(pageId);
        

        
        // Scroll to top
        window.scrollTo(0, 0);
        
        hideLoadingSpinner();
    }, 500);
}

function initializePage(pageId) {
    switch(pageId) {
        case 'home':
            // Always ensure home components are loaded and visible
            ensureHomeComponentsLoaded();
            initializeCarousel();
            animateCounters();
            break;
        case 'deals':
            loadDeals();
            animateCounters();
            break;
        case 'discover':
            loadRestaurants();
            break;
        case 'promo':
            loadPromoCodes();
            animateCounters();
            break;
        case 'vendors':
            animateCounters();
            break;
    }
}

// Simple function to ensure home components are loaded
function ensureHomeComponentsLoaded() {
    const homeComponents = document.getElementById('home-components');
    if (!homeComponents) return;
    
    // List of required components
    const requiredComponents = [
        { path: 'components/exclusive-deals.html', selector: '.exclusive-deals' },
        { path: 'components/hot-promos.html', selector: '.hot-promos' },
        { path: 'components/features.html', selector: '.features' },
        { path: 'components/how-it-works.html', selector: '.how-it-works' },
        { path: 'components/vendor-invitation.html', selector: '.vendor-invitation' },
        { path: 'components/app-screenshots.html', selector: '.app-screenshots' },
        { path: 'components/testimonials.html', selector: '.testimonials' },
        { path: 'components/cta-section.html', selector: '.cta-section' }
    ];
    
    // Load missing components
    requiredComponents.forEach(component => {
        const element = homeComponents.querySelector(component.selector);
        if (!element) {
            // Load the missing component
            fetch(component.path)
                .then(response => response.text())
                .then(html => {
                    homeComponents.insertAdjacentHTML('beforeend', html);
                })
                .catch(error => {
                    console.error('Failed to load component:', component.path);
                });
        } else {
            // Make sure existing component is visible
            element.style.display = 'block';
            element.style.opacity = '1';
            element.style.visibility = 'visible';
        }
    });
}



// Mobile Navigation
export function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.drawer-overlay');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}

export function closeDrawer() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.drawer-overlay');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
}