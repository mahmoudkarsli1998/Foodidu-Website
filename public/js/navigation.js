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