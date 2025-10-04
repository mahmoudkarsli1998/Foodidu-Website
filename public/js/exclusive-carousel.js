// Exclusive Deals Carousel Functionality
import { AppState } from './state.js';
import { showRabbitNotification } from './utils.js';

// Initialize exclusive carousel
export function initExclusiveCarousel() {
    console.log('Initializing exclusive carousel...');
    const slides = document.querySelectorAll('.exclusive-slide');
    const indicators = document.querySelectorAll('.exclusive-indicator');
    
    if (slides.length > 0) {
        console.log(`Found ${slides.length} slides`);
        // Ensure first slide is active
        slides[0].classList.add('active');
        if (indicators.length > 0) {
            indicators[0].classList.add('active');
        }
        startExclusiveAutoSlide();
    } else {
        console.log('No exclusive slides found');
    }
}

// Start auto-sliding
export function startExclusiveAutoSlide() {
    console.log('Starting auto-slide...');
    AppState.exclusiveSlideInterval = setInterval(() => {
        changeExclusiveSlide(1);
    }, 4000); // Change slide every 4 seconds
}

// Stop auto-sliding
export function stopExclusiveAutoSlide() {
    console.log('Stopping auto-slide...');
    if (AppState.exclusiveSlideInterval) {
        clearInterval(AppState.exclusiveSlideInterval);
    }
}

// Change slide function
export function changeExclusiveSlide(direction) {
    const slides = document.querySelectorAll('.exclusive-slide');
    const indicators = document.querySelectorAll('.exclusive-indicator');
    
    if (slides.length === 0) {
        console.log('No slides found for changing');
        return;
    }
    
    console.log(`Changing slide from ${AppState.currentExclusiveSlide} with direction ${direction}`);
    
    // Remove active class from current slide and indicator
    slides[AppState.currentExclusiveSlide].classList.remove('active');
    if (indicators[AppState.currentExclusiveSlide]) {
        indicators[AppState.currentExclusiveSlide].classList.remove('active');
    }
    
    // Calculate next slide
    AppState.currentExclusiveSlide += direction;
    
    if (AppState.currentExclusiveSlide >= slides.length) {
        AppState.currentExclusiveSlide = 0;
    } else if (AppState.currentExclusiveSlide < 0) {
        AppState.currentExclusiveSlide = slides.length - 1;
    }
    
    console.log(`New slide index: ${AppState.currentExclusiveSlide}`);
    
    // Add active class to new slide and indicator
    slides[AppState.currentExclusiveSlide].classList.add('active');
    if (indicators[AppState.currentExclusiveSlide]) {
        indicators[AppState.currentExclusiveSlide].classList.add('active');
    }
}

// Go to specific slide (for indicator clicks)
export function goToExclusiveSlide(slideIndex) {
    const slides = document.querySelectorAll('.exclusive-slide');
    const indicators = document.querySelectorAll('.exclusive-indicator');
    
    if (slideIndex < 0 || slideIndex >= slides.length) return;
    
    console.log(`Going to slide ${slideIndex}`);
    
    // Remove active class from current slide and indicator
    slides[AppState.currentExclusiveSlide].classList.remove('active');
    if (indicators[AppState.currentExclusiveSlide]) {
        indicators[AppState.currentExclusiveSlide].classList.remove('active');
    }
    
    // Set new slide
    AppState.currentExclusiveSlide = slideIndex;
    
    // Add active class to new slide and indicator
    slides[AppState.currentExclusiveSlide].classList.add('active');
    if (indicators[AppState.currentExclusiveSlide]) {
        indicators[AppState.currentExclusiveSlide].classList.add('active');
    }
    
    // Restart auto-slide timer
    stopExclusiveAutoSlide();
    setTimeout(startExclusiveAutoSlide, 1000); // Restart after 1 second
}

// Copy exclusive code function
export function copyExclusiveCode(code, vendor) {
    navigator.clipboard.writeText(code).then(function() {
        // Find the specific copy button
        const copyBtn = event.target;
        const originalText = copyBtn.innerHTML;
        
        copyBtn.innerHTML = '✓ Copied!';
        copyBtn.classList.add('copied');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
            copyBtn.classList.remove('copied');
        }, 2000);
        
        // Show notification with vendor-specific message
        const vendorName = vendor === 'rabbit' ? 'Rabbit' : vendor === 'senem' ? 'Senem' : 'Vendor';
        showRabbitNotification(`${vendorName} promo code copied! 🎉`, 'success');
        
        // Track the copy event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exclusive_promo_copied', {
                'event_category': 'engagement',
                'event_label': code,
                'vendor': vendor
            });
        }
    }).catch(function(err) {
        console.error('Failed to copy: ', err);
        showRabbitNotification('Failed to copy code. Please try again.', 'error');
    });
}