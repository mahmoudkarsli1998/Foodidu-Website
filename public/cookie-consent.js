// // Initialize Firebase
// const firebaseConfig = {
//     apiKey: "AIzaSyCvKDqPjERac1yh0O4BcARsuag6hNN9_1A",
//     authDomain: "foodidu-website.firebaseapp.com",
//     projectId: "foodidu-website",
//     storageBucket: "foodidu-website.appspot.com",
//     messagingSenderId: "515131692962",
//     appId: "1:515131692962:web:5d81b9e165181ec80bc4fb"
// };

// // Initialize Firebase with error handling
// let db;
// let isFirebaseReady = false;

// try {
//     console.log("Initializing Firebase...");
//     firebase.initializeApp(firebaseConfig);
//     db = firebase.firestore();
//     isFirebaseReady = true;
//     console.log("Firebase initialized successfully");
// } catch (error) {
//     console.error("Failed to initialize Firebase:", error);
//     isFirebaseReady = false;
// }

// // Generate a unique visitor ID if not already set
// function getVisitorId() {
//     let visitorId = localStorage.getItem('visitorId');
//     if (!visitorId) {
//         visitorId = 'visitor_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
//         localStorage.setItem('visitorId', visitorId);
//     }
//     return visitorId;
// }

// // Cookie consent functions
// document.addEventListener('DOMContentLoaded', function() {
//     const cookieBanner = document.getElementById('cookie-consent-banner');
//     const acceptButton = document.getElementById('accept-cookies');
//     const rejectButton = document.getElementById('reject-cookies');
//     const cookieSettingsLink = document.getElementById('cookie-settings-link');
    
//     // Check if user has already made a choice
//     const cookieConsent = localStorage.getItem('cookieConsent');
    
//     if (!cookieConsent) {
//         // Show the banner if no choice has been made
//         if (cookieBanner) {
//             cookieBanner.style.display = 'block';
//             cookieBanner.style.animation = 'slideUp 0.5s forwards';
//         }
//     } else {
//         // Apply stored preferences
//         applyStoredPreferences();
//     }
    
//     // Accept cookies
//     if (acceptButton) {
//         acceptButton.addEventListener('click', function() {
//             const consent = {
//                 essential: true,
//                 analytics: true,
//                 marketing: true,
//                 timestamp: new Date().toISOString()
//             };
            
//             saveConsent(consent);
//             hideBanner();
//             applyPreferences(consent);
//         });
//     }
    
//     // Reject cookies
//     if (rejectButton) {
//         rejectButton.addEventListener('click', function() {
//             const consent = {
//                 essential: true, // Essential cookies are always accepted
//                 analytics: false,
//                 marketing: false,
//                 timestamp: new Date().toISOString()
//             };
            
//             saveConsent(consent);
//             hideBanner();
//             applyPreferences(consent);
//         });
//     }
    
//     // Open cookie settings from footer link
//     if (cookieSettingsLink) {
//         cookieSettingsLink.addEventListener('click', function(e) {
//             e.preventDefault();
//             if (cookieBanner) {
//                 cookieBanner.style.display = 'block';
//                 cookieBanner.style.animation = 'slideUp 0.5s forwards';
//             }
//         });
//     }
    
//     // Save consent to localStorage and optionally to Firestore
//     function saveConsent(consent) {
//         // Always save to localStorage
//         localStorage.setItem('cookieConsent', JSON.stringify(consent));
//         console.log("Cookie consent saved to localStorage");
        
//         // Only attempt Firestore if Firebase is ready and we have permissions
//         if (isFirebaseReady && db) {
//             const visitorId = getVisitorId();
            
//             // Use a more defensive approach with better error handling
//             const consentData = {
//                 visitorId: visitorId,
//                 essential: consent.essential,
//                 analytics: consent.analytics,
//                 marketing: consent.marketing,
//                 timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//                 userAgent: navigator.userAgent,
//                 language: navigator.language,
//                 referrer: document.referrer || 'direct',
//                 path: window.location.pathname,
//                 created: new Date().toISOString()
//             };
            
//             // Try to save to Firestore with better error handling
//             db.collection('cookieConsent').doc(visitorId).set(consentData, { merge: true })
//                 .then(() => {
//                     console.log("Cookie consent saved to Firestore");
//                 })
//                 .catch((error) => {
//                     console.warn("Could not save to Firestore (this is okay, data is saved locally):", error.message);
//                     // Don't throw an error - the app should continue working even without Firestore
//                 });
//         } else {
//             console.log("Firestore not available, consent saved locally only");
//         }
//     }
    
//     // Hide the banner
//     function hideBanner() {
//         if (cookieBanner) {
//             cookieBanner.style.animation = 'slideDown 0.5s forwards';
//             setTimeout(() => {
//                 cookieBanner.style.display = 'none';
//             }, 500);
//         }
//     }
    
//     // Apply stored preferences
//     function applyStoredPreferences() {
//         const storedConsent = localStorage.getItem('cookieConsent');
//         if (storedConsent) {
//             try {
//                 const consent = JSON.parse(storedConsent);
//                 applyPreferences(consent);
//             } catch (error) {
//                 console.error("Error parsing stored consent:", error);
//             }
//         }
//     }
    
//     // Apply preferences
//     function applyPreferences(consent) {
//         // Initialize analytics only if consent is given and Firebase is ready
//         if (consent.analytics && isFirebaseReady) {
//             try {
//                 firebase.analytics();
//                 console.log("Analytics initialized");
//             } catch (error) {
//                 console.warn("Could not initialize analytics:", error);
//             }
//         }
        
//         // Additional code for marketing cookies if needed
//         if (consent.marketing) {
//             console.log("Marketing cookies enabled");
//             // Add marketing scripts here
//         }
//     }
// });

// // Track page views for consented users
// function trackPageView() {
//     const storedConsent = localStorage.getItem('cookieConsent');
//     if (storedConsent && isFirebaseReady) {
//         try {
//             const consent = JSON.parse(storedConsent);
//             if (consent.analytics) {
//                 const analytics = firebase.analytics();
//                 analytics.logEvent('page_view', {
//                     page_title: document.title,
//                     page_location: window.location.href,
//                     page_path: window.location.pathname
//                 });
//             }
//         } catch (error) {
//             console.warn("Could not track page view:", error);
//         }
//     }
// }

// // Call trackPageView when page loads
// window.addEventListener('load', trackPageView);
// Initialize Firebase with Analytics
const firebaseConfig = {
    apiKey: "AIzaSyCvKDqPjERac1yh0O4BcARsuag6hNN9_1A",
    authDomain: "foodidu-website.firebaseapp.com",
    projectId: "foodidu-website",
    storageBucket: "foodidu-website.appspot.com",
    messagingSenderId: "515131692962",
    appId: "1:515131692962:web:5d81b9e165181ec80bc4fb"
};

// Initialize Firebase with error handling
let db, analytics;
let isFirebaseReady = false;
let userProfile = {};

try {
    console.log("Initializing Firebase...");
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    analytics = firebase.analytics();
    isFirebaseReady = true;
    console.log("Firebase initialized successfully");
} catch (error) {
    console.error("Failed to initialize Firebase:", error);
    isFirebaseReady = false;
}

// Device and Browser Detection
function getDeviceInfo() {
    const ua = navigator.userAgent;
    let deviceType = 'desktop';
    let os = 'unknown';
    let browser = 'unknown';
    
    // Device Type Detection
    if (/tablet|ipad|playbook|silk/i.test(ua)) {
        deviceType = 'tablet';
    } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(ua)) {
        deviceType = 'mobile';
    }
    
    // OS Detection
    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
    
    // Browser Detection
    if (ua.includes('Chrome') && !ua.includes('Edg')) browser = 'Chrome';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Edg')) browser = 'Edge';
    else if (ua.includes('Opera')) browser = 'Opera';
    
    return {
        type: deviceType,
        os: os,
        browser: browser,
        screenWidth: screen.width,
        screenHeight: screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        colorDepth: screen.colorDepth,
        pixelRatio: window.devicePixelRatio || 1,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        languages: navigator.languages || [navigator.language],
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        userAgent: ua
    };
}

// Location Detection
async function getLocationInfo() {
    try {
        // First try to get precise location (requires user permission)
        const position = await new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                { timeout: 10000, enableHighAccuracy: false }
            );
        });
        
        return {
            type: 'precise',
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date(position.timestamp).toISOString()
        };
    } catch (error) {
        console.log('Precise location not available, trying IP-based location');
        
        // Fallback to IP-based location
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            return {
                type: 'ip_based',
                country: data.country_name,
                countryCode: data.country_code,
                region: data.region,
                city: data.city,
                postal: data.postal,
                latitude: data.latitude,
                longitude: data.longitude,
                timezone: data.timezone,
                isp: data.org
            };
        } catch (ipError) {
            console.warn('IP-based location failed:', ipError);
            return {
                type: 'none',
                error: 'Location detection failed'
            };
        }
    }
}

// User Identification
function getUserInfo() {
    // Check for existing user data
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // Generate or retrieve user ID
    if (!userData.userId) {
        userData.userId = 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }
    
    // Try to get user name from various sources
    if (!userData.userName) {
        // Check if user has filled any forms with name
        const nameInputs = document.querySelectorAll('input[name*="name"], input[id*="name"]');
        nameInputs.forEach(input => {
            if (input.value && input.value.length > 2) {
                userData.userName = input.value;
            }
        });
        
        // Check for logged-in user data (if you have authentication)
        if (window.currentUser && window.currentUser.displayName) {
            userData.userName = window.currentUser.displayName;
        }
    }
    
    // Save updated user data
    localStorage.setItem('userData', JSON.stringify(userData));
    return userData;
}

// Enhanced visitor ID with more entropy
function getVisitorId() {
    let visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
        const deviceInfo = getDeviceInfo();
        const fingerprint = btoa(deviceInfo.userAgent + deviceInfo.screenWidth + deviceInfo.timezone).replace(/[^a-zA-Z0-9]/g, '').substr(0, 8);
        visitorId = 'visitor_' + fingerprint + '_' + Date.now();
        localStorage.setItem('visitorId', visitorId);
    }
    return visitorId;
}

// Enhanced Analytics Events
function trackEnhancedEvent(eventName, eventParams = {}) {
    if (!isFirebaseReady || !analytics) return;
    
    const enhancedParams = {
        ...eventParams,
        visitor_id: getVisitorId(),
        user_id: userProfile.userId || null,
        device_type: userProfile.deviceInfo?.type || 'unknown',
        browser: userProfile.deviceInfo?.browser || 'unknown',
        os: userProfile.deviceInfo?.os || 'unknown',
        country: userProfile.location?.country || 'unknown',
        city: userProfile.location?.city || 'unknown',
        page_path: window.location.pathname,
        page_title: document.title,
        referrer: document.referrer || 'direct'
    };
    
    analytics.logEvent(eventName, enhancedParams);
    console.log(`Tracked event: ${eventName}`, enhancedParams);
}

// Set User Properties for Analytics Audiences
function setUserProperties() {
    if (!isFirebaseReady || !analytics) return;
    
    analytics.setUserProperties({
        device_type: userProfile.deviceInfo?.type || 'unknown',
        browser: userProfile.deviceInfo?.browser || 'unknown',
        operating_system: userProfile.deviceInfo?.os || 'unknown',
        country: userProfile.location?.country || 'unknown',
        city: userProfile.location?.city || 'unknown',
        timezone: userProfile.deviceInfo?.timezone || 'unknown',
        language: userProfile.deviceInfo?.language || 'unknown',
        screen_resolution: userProfile.deviceInfo ? `${userProfile.deviceInfo.screenWidth}x${userProfile.deviceInfo.screenHeight}` : 'unknown',
        user_type: userProfile.userName ? 'identified' : 'anonymous'
    });
    
    // Set User ID for cross-device tracking
    if (userProfile.userId) {
        analytics.setUserId(userProfile.userId);
    }
}

// Cookie consent functions with enhanced tracking
document.addEventListener('DOMContentLoaded', async function() {
    const cookieBanner = document.getElementById('cookie-consent-banner');
    const acceptButton = document.getElementById('accept-cookies');
    const rejectButton = document.getElementById('reject-cookies');
    const cookieSettingsLink = document.getElementById('cookie-settings-link');
    
    // Initialize user profile
    console.log('Initializing user profile...');
    userProfile.userData = getUserInfo();
    userProfile.deviceInfo = getDeviceInfo();
    userProfile.location = await getLocationInfo();
    userProfile.userId = userProfile.userData.userId;
    userProfile.userName = userProfile.userData.userName;
    
    console.log('User profile initialized:', userProfile);
    
    // Always show the banner and track the event
    trackEnhancedEvent('cookie_banner_shown');
    
    if (cookieBanner) {
        cookieBanner.style.display = 'block';
        cookieBanner.style.animation = 'slideUp 0.5s forwards';
    }
    
    // Apply any existing preferences
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent) {
        applyStoredPreferences();
    }
    
    // Accept cookies
    if (acceptButton) {
        acceptButton.addEventListener('click', function() {
            const consent = {
                essential: true,
                analytics: true,
                marketing: true,
                timestamp: new Date().toISOString()
            };
            
            saveConsent(consent);
            hideBanner();
            applyPreferences(consent);
            
            // Track consent given
            trackEnhancedEvent('cookie_consent_given', {
                consent_type: 'all_accepted'
            });
        });
    }
    
    // Reject cookies
    if (rejectButton) {
        rejectButton.addEventListener('click', function() {
            const consent = {
                essential: true,
                analytics: false,
                marketing: false,
                timestamp: new Date().toISOString()
            };
            
            saveConsent(consent);
            hideBanner();
            applyPreferences(consent);
            
            // Track consent rejected
            trackEnhancedEvent('cookie_consent_given', {
                consent_type: 'rejected'
            });
        });
    }
    
    // Open cookie settings
    if (cookieSettingsLink) {
        cookieSettingsLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Cookie settings clicked');
            
            // Remove existing consent to allow fresh choice
            localStorage.removeItem('cookieConsent');
            
            trackEnhancedEvent('cookie_settings_opened');
            
            if (cookieBanner) {
                // Remove any existing classes
                cookieBanner.classList.remove('hide');
                // Force a reflow
                cookieBanner.offsetHeight;
                // Add the show class to trigger animation
                cookieBanner.classList.add('show');
                
                console.log('Cookie banner display triggered');
            } else {
                console.error('Cookie banner element not found');
            }
        });
    }
    
    // Enhanced consent saving
    async function saveConsent(consent) {
        localStorage.setItem('cookieConsent', JSON.stringify(consent));
        console.log("Cookie consent saved locally");
        
        // Enhanced Firestore tracking
        if (isFirebaseReady && db) {
            const visitorId = getVisitorId();
            
            const enhancedConsentData = {
                // Basic consent info
                visitorId: visitorId,
                userId: userProfile.userId,
                userName: userProfile.userName || null,
                essential: consent.essential,
                analytics: consent.analytics,
                marketing: consent.marketing,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                
                // Device information
                deviceInfo: userProfile.deviceInfo,
                
                // Location information
                location: userProfile.location,
                
                // Session information
                sessionInfo: {
                    referrer: document.referrer || 'direct',
                    path: window.location.pathname,
                    url: window.location.href,
                    title: document.title,
                    loadTime: Date.now() - performance.timing.navigationStart
                }
            };
            
            try {
                await db.collection('cookieConsent').doc(visitorId).set(enhancedConsentData, { merge: true });
                console.log("Enhanced consent data saved to Firestore");
                
                // Also save to a separate collection for analytics
                await db.collection('userSessions').add({
                    ...enhancedConsentData,
                    sessionId: 'session_' + Date.now(),
                    eventType: 'consent_given'
                });
                
            } catch (error) {
                console.warn("Could not save to Firestore:", error.message);
            }
        }
    }
    
    function hideBanner() {
        if (cookieBanner) {
            cookieBanner.classList.add('hide');
            cookieBanner.classList.remove('show');
            console.log('Cookie banner hidden');
        }
    }
    
    function applyStoredPreferences() {
        const storedConsent = localStorage.getItem('cookieConsent');
        if (storedConsent) {
            try {
                const consent = JSON.parse(storedConsent);
                applyPreferences(consent);
            } catch (error) {
                console.error("Error parsing stored consent:", error);
                localStorage.removeItem('cookieConsent');
            }
        }
    }
    
    function applyPreferences(consent) {
        if (consent.analytics && isFirebaseReady) {
            try {
                // Set user properties for audience building
                setUserProperties();
                
                console.log("Analytics initialized with enhanced tracking");
                
                // Track page view with enhanced data
                trackEnhancedEvent('page_view');
                
            } catch (error) {
                console.warn("Could not initialize analytics:", error);
            }
        }
        
        if (consent.marketing) {
            console.log("Marketing cookies enabled");
            // Initialize marketing pixels, ads tracking, etc.
            initializeMarketingScripts();
        }
    }
    
    // Initialize marketing scripts
    function initializeMarketingScripts() {
        // Google Ads
        if (typeof gtag !== 'undefined') {
            gtag('config', 'YOUR_GOOGLE_ADS_ID', {
                custom_map: {
                    'custom_parameter_1': 'device_type',
                    'custom_parameter_2': 'user_location'
                }
            });
        }
        
        // Facebook Pixel (example)
        // fbq('init', 'YOUR_FACEBOOK_PIXEL_ID');
        // fbq('track', 'PageView');
    }
});

// Enhanced page tracking
function trackPageView() {
    const storedConsent = localStorage.getItem('cookieConsent');
    if (storedConsent && isFirebaseReady) {
        try {
            const consent = JSON.parse(storedConsent);
            if (consent.analytics) {
                trackEnhancedEvent('page_view', {
                    engagement_time_msec: Date.now() - performance.timing.navigationStart
                });
            }
        } catch (error) {
            console.warn("Could not track page view:", error);
        }
    }
}

// Track user interactions
function trackUserInteraction(element, action) {
    trackEnhancedEvent('user_interaction', {
        element_type: element.tagName?.toLowerCase() || 'unknown',
        element_id: element.id || null,
        element_class: element.className || null,
        action: action,
        element_text: element.textContent?.substring(0, 100) || null
    });
}

// Auto-track clicks on important elements
document.addEventListener('click', function(e) {
    const target = e.target;
    
    // Track button clicks
    if (target.tagName === 'BUTTON' || target.type === 'submit') {
        trackUserInteraction(target, 'click');
    }
    
    // Track link clicks
    if (target.tagName === 'A') {
        trackUserInteraction(target, 'link_click');
    }
    
    // Track form submissions
    if (target.type === 'submit') {
        trackEnhancedEvent('form_submit', {
            form_id: target.closest('form')?.id || null
        });
    }
});

// Track scroll depth
let maxScrollDepth = 0;
window.addEventListener('scroll', function() {
    const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track milestone scroll depths
        if (scrollDepth >= 25 && scrollDepth < 50 && maxScrollDepth < 25) {
            trackEnhancedEvent('scroll_depth', { depth_percentage: 25 });
        } else if (scrollDepth >= 50 && scrollDepth < 75 && maxScrollDepth < 50) {
            trackEnhancedEvent('scroll_depth', { depth_percentage: 50 });
        } else if (scrollDepth >= 75 && scrollDepth < 90 && maxScrollDepth < 75) {
            trackEnhancedEvent('scroll_depth', { depth_percentage: 75 });
        } else if (scrollDepth >= 90 && maxScrollDepth < 90) {
            trackEnhancedEvent('scroll_depth', { depth_percentage: 90 });
        }
    }
});

// Track time on page
let pageStartTime = Date.now();
let isPageVisible = true;

document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden' && isPageVisible) {
        const timeOnPage = Date.now() - pageStartTime;
        trackEnhancedEvent('page_engagement', {
            engagement_time_msec: timeOnPage,
            engagement_type: 'page_exit'
        });
        isPageVisible = false;
    } else if (document.visibilityState === 'visible' && !isPageVisible) {
        pageStartTime = Date.now();
        isPageVisible = true;
    }
});

// Track before page unload
window.addEventListener('beforeunload', function() {
    if (isPageVisible) {
        const timeOnPage = Date.now() - pageStartTime;
        trackEnhancedEvent('page_engagement', {
            engagement_time_msec: timeOnPage,
            engagement_type: 'page_unload'
        });
    }
});

// Initialize tracking when page loads
window.addEventListener('load', function() {
    trackPageView();
    
    // Track performance metrics
    setTimeout(() => {
        const perfData = performance.timing;
        trackEnhancedEvent('page_performance', {
            load_time: perfData.loadEventEnd - perfData.navigationStart,
            dom_ready_time: perfData.domContentLoadedEventEnd - perfData.navigationStart,
            first_byte_time: perfData.responseStart - perfData.navigationStart
        });
    }, 1000);
});

// Export functions for external use
window.foodiduAnalytics = {
    trackEvent: trackEnhancedEvent,
    getUserProfile: () => userProfile,
    updateUserName: (name) => {
        userProfile.userName = name;
        userProfile.userData.userName = name;
        localStorage.setItem('userData', JSON.stringify(userProfile.userData));
        setUserProperties();
    }
};