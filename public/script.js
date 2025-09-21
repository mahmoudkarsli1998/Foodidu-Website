// Global Variables
let currentPage = 'home';
let currentSlide = 0;
let slideInterval;
let currentDealsFilter = { cuisine: '', price: '', discount: '', location: '' };
let currentCategory = 'all';
let currentPromoCategory = 'all';
let dealsPage = 1;
let isLoading = false;

// Enhanced Sample Data
const dealsData = [
    {
        id: 1,
        restaurant: "Mario's Pizza Palace",
        cuisine: "pizza",
        title: "Buy 1 Get 1 Free Pizza",
        description: "Get a free pizza of equal or lesser value with any large pizza purchase",
        discount: "50%",
        validity: "Valid until Dec 31, 2024",
        location: "Downtown",
        price: 15.99,
        icon: "🍕",
        featured: true
    },
    {
        id: 2,
        restaurant: "Burger Junction",
        cuisine: "burger",
        title: "20% Off All Burgers",
        description: "Discount on all premium burger combos and family meals",
        discount: "20%",
        validity: "Valid until Dec 25, 2024",
        location: "Midtown",
        price: 12.99,
        icon: "🍔",
        featured: false
    },
    {
        id: 3,
        restaurant: "Coffee Corner",
        cuisine: "coffee",
        title: "Free Coffee with Pastry",
        description: "Buy any pastry and get coffee for free - perfect morning combo",
        discount: "Buy1Get1",
        validity: "Valid until Jan 15, 2025",
        location: "Uptown",
        price: 8.99,
        icon: "☕",
        featured: true
    },
    {
        id: 4,
        restaurant: "Dragon Palace",
        cuisine: "chinese",
        title: "30% Off Family Meals",
        description: "Perfect for family dinners and gatherings - serves 4-6 people",
        discount: "30%",
        validity: "Valid until Jan 10, 2025",
        location: "Chinatown",
        price: 25.99,
        icon: "🥡",
        featured: false
    },
    {
        id: 5,
        restaurant: "Spice Garden",
        cuisine: "indian",
        title: "15% Off Lunch Buffet",
        description: "All-you-can-eat lunch buffet with authentic Indian cuisine",
        discount: "15%",
        validity: "Valid until Dec 28, 2024",
        location: "Little India",
        price: 18.99,
        icon: "🍛",
        featured: true
    },
    {
        id: 6,
        restaurant: "Taco Fiesta",
        cuisine: "mexican",
        title: "Taco Tuesday Special",
        description: "Buy 2 tacos get 1 free every Tuesday",
        discount: "33%",
        validity: "Every Tuesday",
        location: "South Side",
        price: 9.99,
        icon: "🌮",
        featured: false
    },
    {
        id: 7,
        restaurant: "Pasta Paradise",
        cuisine: "italian",
        title: "Wine & Dine Combo",
        description: "Free glass of wine with any pasta dish",
        discount: "25%",
        validity: "Valid until Jan 5, 2025",
        location: "Little Italy",
        price: 22.99,
        icon: "🍝",
        featured: true
    },
    {
        id: 8,
        restaurant: "Sushi Zen",
        cuisine: "japanese",
        title: "Happy Hour Sushi",
        description: "50% off all sushi rolls from 3-6 PM",
        discount: "50%",
        validity: "Daily 3-6 PM",
        location: "Downtown",
        price: 16.99,
        icon: "🍣",
        featured: false
    }
];

const restaurantsData = [
    {
        id: 1,
        name: "Mario's Pizza Palace",
        cuisine: "Italian • Pizza",
        category: "fast-food",
        rating: 4.5,
        location: "Downtown",
        icon: "🍕",
        specialties: ["Wood-fired pizza", "Fresh ingredients", "Family recipes"]
    },
    {
        id: 2,
        name: "Hidden Gem Café",
        cuisine: "Café • Local",
        category: "local-gems",
        rating: 4.8,
        location: "Old Quarter",
        icon: "☕",
        specialties: ["Artisan coffee", "Homemade pastries", "Cozy atmosphere"]
    },
    {
        id: 3,
        name: "Fresh & Fit",
        cuisine: "Healthy • Salads",
        category: "healthy",
        rating: 4.6,
        location: "Health District",
        icon: "🥗",
        specialties: ["Organic ingredients", "Custom bowls", "Protein options"]
    },
    {
        id: 4,
        name: "Sweet Treats",
        cuisine: "Desserts • Bakery",
        category: "dessert",
        rating: 4.7,
        location: "Market Street",
        icon: "🧁",
        specialties: ["Custom cakes", "Fresh daily", "Sugar-free options"]
    },
    {
        id: 5,
        name: "Burger Junction",
        cuisine: "American • Burgers",
        category: "fast-food",
        rating: 4.3,
        location: "Midtown",
        icon: "🍔",
        specialties: ["Gourmet burgers", "Hand-cut fries", "Craft beer"]
    },
    {
        id: 6,
        name: "Coffee Corner",
        cuisine: "Coffee • Café",
        category: "coffee",
        rating: 4.4,
        location: "Uptown",
        icon: "☕",
        specialties: ["Single origin", "Latte art", "Free WiFi"]
    },
    {
        id: 7,
        name: "Le Petit Bistro",
        cuisine: "French • Fine Dining",
        category: "fine-dining",
        rating: 4.9,
        location: "French Quarter",
        icon: "🥐",
        specialties: ["Authentic French", "Wine pairing", "Romantic setting"]
    },
    {
        id: 8,
        name: "Noodle House",
        cuisine: "Asian • Noodles",
        category: "fast-food",
        rating: 4.2,
        location: "Asia Town",
        icon: "🍜",
        specialties: ["Hand-pulled noodles", "Spicy broths", "Quick service"]
    }
];

const promoCodesData = [
    {
        id: 1,
        brand: "BreadFast",
        category: "delivery",
        code: "SMR",
        discount: "Free Delivery",
        expiry: "Dec 31, 2025",
        logo: "BF",
        description: "Free Delivery on first order above 350 LE"
    },
    {
        id: 2,
        brand: "Pizza Hut",
        category: "fast-food",
        code: "NEW40",
        discount: "40% Off First Order",
        expiry: "Dec 31, 2025",
        logo: "PH",
        description: "40% Off first order on the Pizza Hut app"
    },
    {
        id: 3,
        brand: "MINI Berit",
        category: "bakery",
        code: "MINI25",
        discount: "25% Off Lebanese Pastries",
        expiry: "Oct 31, 2025",
        logo: "MB",
        description: "Get 25% off on all Lebanese pastries"
    },
    {
        id: 4,
        brand: "KFC",
        category: "fast-food",
        code: "KFCBOX",
        discount: "30% Off Family Boxes",
        expiry: "Nov 15, 2025",
        logo: "KF",
        description: "Save 30% on all family meal boxes"
    },
    {
        id: 5,
        brand: "Gourment",
        category: "fine-dining",
        code: "GOURM50",
        discount: "50% Off Second Main Course",
        expiry: "Oct 1, 2025",
        logo: "GM",
        description: "Buy one main course, get 50% off the second"
    },
    {
        id: 6,
        brand: "CILANTRO",
        category: "coffee",
        code: "CILAN2",
        discount: "Buy 1 Get 1 Free Coffee",
        expiry: "Dec 15, 2025",
        logo: "CI",
        description: "Free coffee with any coffee purchase"
    },
    {
        id: 7,
        brand: "BURGER KING",
        category: "fast-food",
        code: "WHOPPER",
        discount: "35% Off Whopper Meals",
        expiry: "Nov 30, 2025",
        logo: "BK",
        description: "Save on all Whopper meal combinations"
    },
    {
        id: 8,
        brand: "BUFFALO BURGER",
        category: "fast-food",
        code: "BUFF45",
        discount: "45% Off First Order",
        expiry: "Oct 15, 2025",
        logo: "BB",
        description: "Save 45% on your first Buffalo Burger order"
    },
    {
        id: 9,
        brand: "Zumra Food",
        category: "healthy",
        code: "HEALTHY",
        discount: "20% Off Healthy Meals",
        expiry: "Dec 31, 2025",
        logo: "ZF",
        description: "20% discount on all healthy meal plans"
    },
    {
        id: 3,
        brand: "Quick Delivery",
        category: "delivery",
        code: "FASTFOOD",
        discount: "Free Delivery",
        expiry: "Jan 30, 2025",
        logo: "QD",
        description: "On orders above $25"
    },
    {
        id: 4,
        brand: "Fine Dine",
        category: "fine-dining",
        code: "LUXURY25",
        discount: "25% Off 3-Course Meal",
        expiry: "Feb 14, 2025",
        logo: "FD",
        description: "Perfect for date nights"
    },
    {
        id: 5,
        brand: "Burger King",
        category: "fast-food",
        code: "WHOPPER15",
        discount: "15% Off Whopper Meal",
        expiry: "Dec 28, 2024",
        logo: "BK",
        description: "Includes fries and drink"
    },
    {
        id: 6,
        brand: "Taco Bell",
        category: "fast-food",
        code: "TACO30",
        discount: "30% Off Family Pack",
        expiry: "Jan 20, 2025",
        logo: "TB",
        description: "Feeds 4-6 people"
    },
    {
        id: 7,
        brand: "Starbucks",
        category: "coffee",
        code: "STAR25",
        discount: "25% Off Seasonal Drinks",
        expiry: "Feb 28, 2025",
        logo: "SB",
        description: "Holiday specials included"
    },
    {
        id: 8,
        brand: "DoorDash",
        category: "delivery",
        code: "DASH40",
        discount: "$4 Off Orders Over $20",
        expiry: "Jan 31, 2025",
        logo: "DD",
        description: "New users only"
    }
];

// Navigation Functions
function showPage(pageId) {
    showLoadingSpinner();
    
    setTimeout(() => {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        document.getElementById(pageId).classList.add('active');
        currentPage = pageId;
        
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

// Hero Carousel Functions
function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // Start auto-play
    startCarouselAutoPlay();
    
    // Initialize first slide
    updateCarousel();
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    
    currentSlide += direction;
    
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    updateCarousel();
    restartCarouselAutoPlay();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
    restartCarouselAutoPlay();
}

function updateCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev');
        if (index === currentSlide) {
            slide.classList.add('active');
        } else if (index === currentSlide - 1 || (currentSlide === 0 && index === slides.length - 1)) {
            slide.classList.add('prev');
        }
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function startCarouselAutoPlay() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function restartCarouselAutoPlay() {
    clearInterval(slideInterval);
    startCarouselAutoPlay();
}

// Mobile Navigation
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.drawer-overlay');
    const mobileDrawer = document.getElementById('mobile-drawer');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeDrawer() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.drawer-overlay');
    const mobileDrawer = document.getElementById('mobile-drawer');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
}

// Deals Page Functions
function loadDeals() {
    const dealsGrid = document.getElementById('deals-grid');
    if (!dealsGrid) return;
    
    let filteredDeals = dealsData;
    
    // Apply filters
    if (currentDealsFilter.cuisine) {
        filteredDeals = filteredDeals.filter(deal => deal.cuisine === currentDealsFilter.cuisine);
    }
    
    if (currentDealsFilter.location) {
        filteredDeals = filteredDeals.filter(deal => 
            deal.location.toLowerCase().includes(currentDealsFilter.location.toLowerCase())
        );
    }
    
    // Apply sorting
    if (currentDealsFilter.price === 'low') {
        filteredDeals.sort((a, b) => a.price - b.price);
    } else if (currentDealsFilter.price === 'high') {
        filteredDeals.sort((a, b) => b.price - a.price);
    }
    
    if (currentDealsFilter.discount === 'highest') {
        filteredDeals.sort((a, b) => {
            const aDiscount = parseInt(a.discount) || 0;
            const bDiscount = parseInt(b.discount) || 0;
            return bDiscount - aDiscount;
        });
    }
    
    // Show deals with pagination
    const dealsPerPage = 6;
    const startIndex = 0;
    const endIndex = dealsPerPage * dealsPage;
    const visibleDeals = filteredDeals.slice(startIndex, endIndex);
    
    dealsGrid.innerHTML = visibleDeals.map(deal => `
        <div class="deal-card" data-aos="fade-up">
            <div class="deal-image">
                ${deal.icon}
            </div>
            <div class="deal-content">
                <div class="deal-title">${deal.restaurant}</div>
                <div class="deal-description">${deal.title}</div>
                <p>${deal.description}</p>
                <div class="deal-meta">
                    <span class="deal-discount">${deal.discount} OFF</span>
                    <span class="deal-validity">${deal.validity}</span>
                </div>
                <button class="deal-btn" onclick="getDeal(${deal.id})">Get Deal</button>
            </div>
        </div>
    `).join('');
    
    // Show/hide load more button
    const loadMoreContainer = document.querySelector('.load-more-container');
    if (loadMoreContainer) {
        loadMoreContainer.style.display = endIndex < filteredDeals.length ? 'block' : 'none';
    }
}

function loadMoreDeals() {
    if (isLoading) return;
    
    isLoading = true;
    dealsPage++;
    
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.textContent = 'Loading...';
        loadMoreBtn.disabled = true;
    }
    
    setTimeout(() => {
        loadDeals();
        isLoading = false;
        
        if (loadMoreBtn) {
            loadMoreBtn.textContent = 'Load More Deals';
            loadMoreBtn.disabled = false;
        }
    }, 1000);
}

function filterDeals(value, type) {
    currentDealsFilter[type] = value;
    dealsPage = 1;
    loadDeals();
}

function getDeal(dealId) {
    const deal = dealsData.find(d => d.id === dealId);
    showNotification(`🎉 Great choice! Redirecting to ${deal.restaurant}...`);
    
    setTimeout(() => {
        downloadApp();
    }, 1500);
}

// Discovery Page Functions
function loadRestaurants() {
    const restaurantsGrid = document.getElementById('restaurants-grid');
    if (!restaurantsGrid) return;
    
    let filteredRestaurants = restaurantsData;
    
    if (currentCategory !== 'all') {
        filteredRestaurants = filteredRestaurants.filter(restaurant => 
            restaurant.category === currentCategory
        );
    }
    
    restaurantsGrid.innerHTML = filteredRestaurants.map(restaurant => `
        <div class="restaurant-card" data-aos="fade-up">
            <div class="restaurant-image">
                ${restaurant.icon}
            </div>
            <div class="restaurant-content">
                <div class="restaurant-name">${restaurant.name}</div>
                <div class="restaurant-cuisine">${restaurant.cuisine}</div>
                <div class="restaurant-rating">
                    <div class="stars">${'★'.repeat(Math.floor(restaurant.rating))}${'☆'.repeat(5-Math.floor(restaurant.rating))}</div>
                    <span>${restaurant.rating}</span>
                </div>
                <div class="restaurant-specialties">
                    ${restaurant.specialties.slice(0, 2).map(specialty => 
                        `<span class="specialty-tag">${specialty}</span>`
                    ).join('')}
                </div>
                <button class="restaurant-btn" onclick="seeRestaurantDeals(${restaurant.id})">See Deals</button>
            </div>
        </div>
    `).join('');
}

function filterCategory(element, category) {
    // Remove active class from all chips
    document.querySelectorAll('.category-chip').forEach(chip => {
        chip.classList.remove('active');
    });
    
    // Add active class to clicked chip
    element.classList.add('active');
    
    currentCategory = category;
    loadRestaurants();
}

function searchRestaurants() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) {
        loadRestaurants();
        return;
    }
    
    const filteredRestaurants = restaurantsData.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisine.toLowerCase().includes(query) ||
        restaurant.location.toLowerCase().includes(query) ||
        restaurant.specialties.some(specialty => specialty.toLowerCase().includes(query))
    );
    
    const restaurantsGrid = document.getElementById('restaurants-grid');
    restaurantsGrid.innerHTML = filteredRestaurants.map(restaurant => `
        <div class="restaurant-card" data-aos="fade-up">
            <div class="restaurant-image">
                ${restaurant.icon}
            </div>
            <div class="restaurant-content">
                <div class="restaurant-name">${restaurant.name}</div>
                <div class="restaurant-cuisine">${restaurant.cuisine}</div>
                <div class="restaurant-rating">
                    <div class="stars">${'★'.repeat(Math.floor(restaurant.rating))}${'☆'.repeat(5-Math.floor(restaurant.rating))}</div>
                    <span>${restaurant.rating}</span>
                </div>
                <div class="restaurant-specialties">
                    ${restaurant.specialties.slice(0, 2).map(specialty => 
                        `<span class="specialty-tag">${specialty}</span>`
                    ).join('')}
                </div>
                <button class="restaurant-btn" onclick="seeRestaurantDeals(${restaurant.id})">See Deals</button>
            </div>
        </div>
    `).join('');
    
    if (filteredRestaurants.length === 0) {
        restaurantsGrid.innerHTML = '<div class="no-results"><p>No restaurants found matching your search.</p><button onclick="loadRestaurants()" class="retry-btn">Show All Restaurants</button></div>';
    }
}

function seeRestaurantDeals(restaurantId) {
    const restaurant = restaurantsData.find(r => r.id === restaurantId);
    showNotification(`Finding deals for ${restaurant.name}...`);
    
    setTimeout(() => {
        showPage('deals');
    }, 1000);
}

// Promo Codes Page Functions
function loadPromoCodes() {
    const promoGrid = document.getElementById('promo-grid');
    if (!promoGrid) return;
    
    let filteredPromos = promoCodesData;
    
    if (currentPromoCategory !== 'all') {
        filteredPromos = filteredPromos.filter(promo => 
            promo.category === currentPromoCategory
        );
    }
    
    promoGrid.innerHTML = filteredPromos.map(promo => `
        <div class="promo-card" data-aos="fade-up">
            <div class="promo-header">
                <div class="promo-logo">${promo.logo}</div>
                <div class="promo-brand">${promo.brand}</div>
            </div>
            <div class="promo-code-section">
                <div class="promo-discount">${promo.discount}</div>
                <div class="promo-code" id="code-${promo.id}">${promo.code}</div>
                <div class="promo-description">${promo.description}</div>
                <div class="promo-expiry">Expires: ${promo.expiry}</div>
                <button class="copy-btn" onclick="copyPromoCode('${promo.code}', ${promo.id})">Copy Code</button>
            </div>
        </div>
    `).join('');
}

function filterPromos(element, category) {
    // Remove active class from all categories
    document.querySelectorAll('.promo-category').forEach(cat => {
        cat.classList.remove('active');
    });
    
    // Add active class to clicked category
    element.classList.add('active');
    
    currentPromoCategory = category;
    loadPromoCodes();
}

function copyPromoCode(code, promoId) {
    // Create a temporary text area to copy the code
    const textArea = document.createElement('textarea');
    textArea.value = code;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    // Show success message
    showNotification(`Promo code "${code}" copied to clipboard! 🎉`);
    
    // Update button text temporarily
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.background = '#10b981';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '#eab308';
    }, 2000);
}

// Vendor Application Functions
function initializeVendorForm() {
    // No JS needed for direct HTML POST to Google Apps Script
    // Remove event listener to allow default form submission
}

function handleVendorSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    const scriptURL = 'https://script.google.com/macros/s/AKfycby64W3NO8W_qvOIWd3RT5jSR-IEZpApQWOyL9T-s_8ouF6lmTVdS3rLtkrCpTenCCg/exec';

function initializeVendorForm() {
    console.log('Initializing vendor form...');
    const form = document.getElementById('vendor-application-form');
    if (form) {
        console.log('Found vendor form, adding submit handler');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submit triggered');
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;
            
            const formData = new FormData(form);
            const loadingMessage = document.createElement('div');
            loadingMessage.textContent = 'Submitting...';
            loadingMessage.style.color = '#eab308';
            form.appendChild(loadingMessage);

            fetch(scriptURL, {
                method: 'POST',
                body: formData,
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Success! Your application has been submitted.');
                    form.reset();
                } else {
                    throw new Error('Network response was not ok: ' + response.status);
                }
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('Error! Something went wrong. Please try again.');
            })
            .finally(() => {
                if (submitBtn) submitBtn.disabled = false;
                if (loadingMessage) loadingMessage.remove();
            });
        });
    } else {
        console.error('Vendor form not found in the DOM');
    }
}
    const formData = new FormData(form);

    fetch(scriptURL, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        showNotification('🎉 Thank you! Your application has been submitted successfully. We\'ll contact you within 24 hours.');
        form.reset();
        submitBtn.textContent = 'Submit Application';
        submitBtn.disabled = false;
    })
    .catch(error => {
        showNotification('Submission failed. Please try again later.', 'error');
        submitBtn.textContent = 'Submit Application';
        submitBtn.disabled = false;
    });
}

// Utility Functions
function downloadApp() {
    showNotification('🚀 Redirecting to app store...');
    
    // Simulate app store redirect
    setTimeout(() => {
        showNotification('📱 App download started! Check your device for installation.');
    }, 1500);
}

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #eab308, #facc15)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10001;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function showLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.classList.add('active');
    }
}

function hideLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.classList.remove('active');
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericTarget = parseInt(target.replace(/\D/g, ''));
        
        if (isNaN(numericTarget)) return;
        
        let current = 0;
        const increment = numericTarget / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                const suffix = target.replace(/\d/g, '');
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 30);
    });
}

// Enhanced Interactive Features
function addRippleEffect(element) {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Prevent invalid selector for href="#"
            if (href && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Navbar background on scroll
function initializeNavbarEffects() {
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = "url('images/BG.svg') center center/cover no-repeat, rgba(255, 255, 255, 0.98)";
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.background = "url('images/BG.svg') center center/cover no-repeat, rgba(255, 255, 255, 0.95)";
            navbar.style.boxShadow = 'none';
        }
    });
}

// Feature card hover effects
function initializeFeatureCardEffects() {
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize testimonial highlights
function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    function highlightTestimonial() {
        testimonials.forEach((testimonial, index) => {
            if (index === currentTestimonial) {
                testimonial.style.transform = 'scale(1.05)';
                testimonial.style.boxShadow = '0 10px 30px rgba(234, 179, 8, 0.2)';
            } else {
                testimonial.style.transform = 'scale(1)';
                testimonial.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            }
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }

    if (testimonials.length > 0) {
        setInterval(highlightTestimonial, 4000);
    }
}

// Screenshots carousel touch/swipe support
function initializeScreenshotsCarousel() {
    const screenshotsCarousel = document.querySelector('.screenshots-carousel');
    if (!screenshotsCarousel) return;

    let isScrolling = false;
    let startX = 0;
    let scrollLeft = 0;

    screenshotsCarousel.addEventListener('mousedown', (e) => {
        isScrolling = true;
        startX = e.pageX - screenshotsCarousel.offsetLeft;
        scrollLeft = screenshotsCarousel.scrollLeft;
        screenshotsCarousel.style.cursor = 'grabbing';
    });

    screenshotsCarousel.addEventListener('mouseleave', () => {
        isScrolling = false;
        screenshotsCarousel.style.cursor = 'grab';
    });

    screenshotsCarousel.addEventListener('mouseup', () => {
        isScrolling = false;
        screenshotsCarousel.style.cursor = 'grab';
    });

    screenshotsCarousel.addEventListener('mousemove', (e) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - screenshotsCarousel.offsetLeft;
        const walk = (x - startX) * 2;
        screenshotsCarousel.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    screenshotsCarousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - screenshotsCarousel.offsetLeft;
        scrollLeft = screenshotsCarousel.scrollLeft;
    });

    screenshotsCarousel.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - screenshotsCarousel.offsetLeft;
        const walk = (x - startX) * 2;
        screenshotsCarousel.scrollLeft = scrollLeft - walk;
    });
}

// Add CSS for ripple animation
function addRippleStyles() {
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            .specialty-tag {
                background: rgba(234, 179, 8, 0.1);
                color: #eab308;
                padding: 0.2rem 0.5rem;
                border-radius: 12px;
                font-size: 0.8rem;
                margin-right: 0.5rem;
                margin-bottom: 0.5rem;
                display: inline-block;
            }
            .restaurant-specialties {
                margin-bottom: 1rem;
            }
            .no-results {
                grid-column: 1 / -1;
                text-align: center;
                padding: 3rem;
                background: white;
                border-radius: 20px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
            .retry-btn {
                background: linear-gradient(135deg, #eab308, #facc15);
                color: white;
                padding: 0.8rem 1.5rem;
                border: none;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                margin-top: 1rem;
                transition: all 0.3s ease;
            }
            .retry-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(234, 179, 8, 0.3);
            }
            .promo-description {
                color: #666;
                font-size: 0.9rem;
                margin-bottom: 1rem;
                font-style: italic;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize page loading animation
function initializePageLoading() {
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Search input enter key support
function initializeSearchInput() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchRestaurants();
            }
        });
    }
}

// Intersection Observer for animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple styles
    addRippleStyles();
    
    // Initialize all interactive elements
    initializeSmoothScrolling();
    initializeNavbarEffects();
    initializeFeatureCardEffects();
    initializeTestimonials();
    initializeScreenshotsCarousel();
    initializePageLoading();
    initializeVendorForm();
    initializeScrollAnimations();
    
    // Initialize carousel on home page
    if (currentPage === 'home') {
        initializeCarousel();
    }
    
    // Add ripple effects to buttons
    document.querySelectorAll('button, .app-btn').forEach(button => {
        addRippleEffect(button);
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            closeDrawer();
        });
    });
    
    // Initialize search input for discovery page
    initializeSearchInput();
    
    // Initialize page content
    initializePage(currentPage);
    
    console.log('🍕 Foodidu loaded successfully! Ready to discover amazing food deals!');
});

// Keyboard navigation for carousel
document.addEventListener('keydown', function(e) {
    if (currentPage === 'home') {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        closeDrawer();
    }
});

// Prevent carousel auto-play when user is interacting
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        clearInterval(slideInterval);
    } else if (currentPage === 'home') {
        startCarouselAutoPlay();
    }
});

// Export functions for global access
window.showPage = showPage;
window.toggleMenu = toggleMenu;
window.closeDrawer = closeDrawer;
window.changeSlide = changeSlide;
window.goToSlide = goToSlide;
window.filterDeals = filterDeals;
window.getDeal = getDeal;
window.loadMoreDeals = loadMoreDeals;
window.filterCategory = filterCategory;
window.searchRestaurants = searchRestaurants;
window.seeRestaurantDeals = seeRestaurantDeals;
window.filterPromos = filterPromos;
window.copyPromoCode = copyPromoCode;
window.downloadApp = downloadApp;

