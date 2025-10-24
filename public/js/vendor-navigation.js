// Vendor Pages Navigation - Same as Home Page
// Provides the exact same navigation functionality as the main site

function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.drawer-overlay');
    
    if (hamburger) hamburger.classList.toggle('active');
    if (navMenu) navMenu.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
}

function closeDrawer() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.drawer-overlay');
    
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

function downloadApp() {
    if (typeof showComingSoonModal === 'function') {
        showComingSoonModal();
    } else {
        alert('Foodidu App coming soon!');
    }
}

// Make functions globally available for onclick handlers
window.toggleMenu = toggleMenu;
window.closeDrawer = closeDrawer;
window.downloadApp = downloadApp;

console.log('✅ Vendor navigation loaded - same as home page');