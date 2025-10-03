// Vendor Page Generator Script
// Run this with Node.js to generate new vendor pages

const fs = require("fs");
const path = require("path");

// Vendor configuration
const vendors = {
  "pizza-hut": {
    name: "Pizza Hut",
    logo: "Pizza Hut.svg",
    promoCode: "NEW40",
    discount: "40% Off First Order",
    description: "40% Off first order on the Pizza Hut app",
    expiry: "Dec 31, 2025",
    badge: "New User",
    iosApp: "https://apps.apple.com/app/pizza-hut",
    androidApp: "https://play.google.com/store/apps/details?id=com.pizzahut",
    website: "https://pizzahut.com",
  },
  kfc: {
    name: "KFC",
    logo: "KFC.svg",
    promoCode: "KFCBOX",
    discount: "30% Off Family Boxes",
    description: "Save 30% on all family meal boxes",
    expiry: "Nov 15, 2025",
    badge: "Family Deal",
    iosApp: "https://apps.apple.com/app/kfc",
    androidApp: "https://play.google.com/store/apps/details?id=com.kfc",
    website: "https://kfc.com",
  },
  "burger-king": {
    name: "Burger King",
    logo: "Burger King.svg",
    promoCode: "WHOPPER15",
    discount: "15% Off Whopper Meal",
    description: "Save 15% on all Whopper meals",
    expiry: "Dec 28, 2024",
    badge: "Limited Time",
    iosApp: "https://apps.apple.com/app/burger-king",
    androidApp: "https://play.google.com/store/apps/details?id=com.burgerking",
    website: "https://burgerking.com",
  },
  starbucks: {
    name: "Starbucks",
    logo: "starbucks.png",
    promoCode: "STARBUCKS",
    discount: "Buy 1 Get 1 Free Coffee",
    description: "Free coffee with any coffee purchase",
    expiry: "Dec 31, 2025",
    badge: "BOGO Deal",
    iosApp: "https://apps.apple.com/app/starbucks",
    androidApp: "https://play.google.com/store/apps/details?id=com.starbucks",
    website: "https://starbucks.com",
  },
};

// HTML template
function generateHTML(vendorKey, vendor) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Get exclusive ${vendor.name} promo codes and discounts with Foodidu. Save money on your favorite food orders.">
    <meta name="keywords" content="${vendor.name} promo codes, ${vendor.name} discounts, food delivery deals, Foodidu">
    <meta name="author" content="Foodidu">
    <meta property="og:title" content="${vendor.name} Promo Codes - Foodidu">
    <meta property="og:description" content="Exclusive ${vendor.name} promo codes and deals. Save money on your food orders with verified discount codes.">
    <meta property="og:image" content="../images/${vendor.logo}">
    <meta property="og:url" content="https://foodidu.com/${vendorKey}">
    
    <title>${vendor.name} Promo Codes - Foodidu</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="../images/Logo.svg">
    <link rel="apple-touch-icon" href="../images/Logo.svg">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="../Rabbit-PromoCode/vendor-page.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <div class="logo">
                <a href="../index.html">
                    <img src="../images/Logo-Text.svg" alt="Foodidu Logo"
                         style="height:80px; width:auto; object-fit:contain; margin-right:0.7rem; vertical-align:middle; box-shadow:0 2px 16px rgba(0,0,0,0.07); background:none; border-radius:32px; border: 3px solid #ffe082; transition: box-shadow 0.2s;">
                </a>
            </div>
            <ul class="nav-menu">
                <li><a href="../index.html">Home</a></li>
                <li><a href="../index.html#discover">Discover</a></li>
                <li><a href="../index.html#deals">Deals</a></li>
                <li><a href="../index.html#promo">Promo Codes</a></li>
                <li><a href="../index.html#vendors">Vendors</a></li>
                <li><a href="../index.html#contact">Contact</a></li>
            </ul>
            <div class="hamburger" onclick="toggleMenu()">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <!-- Vendor Page Content -->
    <main class="vendor-page">
        <div class="container">
            <!-- Vendor Logo Section -->
            <section class="vendor-header">
                <div class="vendor-logo-container">
                    <img src="../images/${vendor.logo}" alt="${vendor.name} Logo" class="vendor-logo clean-logo">
                </div>
                <h1 class="vendor-name">${vendor.name}</h1>
                <p class="vendor-description">Get exclusive promo codes and save on your ${vendor.name} orders</p>
            </section>

            <!-- Promo Code Section -->
            <section class="promo-section">
                <div class="promo-card-large">
                    <div class="promo-header">
                        <h2>Exclusive Promo Code</h2>
                        <div class="promo-badge">${vendor.badge}</div>
                    </div>
                    <div class="promo-code-display">
                        <span class="promo-code" id="promoCode">${vendor.promoCode}</span>
                        <button class="copy-btn" onclick="copyPromoCode('${vendor.promoCode}')">
                            <i class="fas fa-copy"></i>
                            Copy Code
                        </button>
                    </div>
                    <p class="promo-instruction">Use this code on ${vendor.name} App or Website</p>
                    <div class="promo-details">
                        <div class="promo-discount">${vendor.discount}</div>
                        <div class="promo-expiry">Expires: ${vendor.expiry}</div>
                    </div>
                </div>
            </section>

            <!-- Download Buttons Section -->
            <section class="download-section">
                <h2>Download Apps</h2>
                
                <!-- Foodidu App -->
                <div class="app-group">
                    <h3>Foodidu App</h3>
                    <p>Get more promo codes and discover hidden gems</p>
                    <div class="download-buttons">
                        <a href="#" class="download-btn app-store" onclick="downloadApp('ios')">
                            <i class="fab fa-apple"></i>
                            <div class="btn-text">
                                <span class="small">Download on the</span>
                                <span class="large">App Store</span>
                            </div>
                        </a>
                        <a href="#" class="download-btn google-play" onclick="downloadApp('android')">
                            <i class="fab fa-google-play"></i>
                            <div class="btn-text">
                                <span class="small">Get it on</span>
                                <span class="large">Google Play</span>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Vendor App & Website -->
                <div class="app-group">
                    <h3>${vendor.name} App & Website</h3>
                    <p>Order directly from ${vendor.name}</p>
                    <div class="download-buttons">
                        <a href="#" class="download-btn app-store" onclick="openVendorApp('${vendorKey}', 'ios')">
                            <i class="fab fa-apple"></i>
                            <div class="btn-text">
                                <span class="small">Download on the</span>
                                <span class="large">App Store</span>
                            </div>
                        </a>
                        <a href="#" class="download-btn google-play" onclick="openVendorApp('${vendorKey}', 'android')">
                            <i class="fab fa-google-play"></i>
                            <div class="btn-text">
                                <span class="small">Get it on</span>
                                <span class="large">Google Play</span>
                            </div>
                        </a>
                        <a href="#" class="download-btn website" onclick="openVendorWebsite('${vendorKey}')">
                            <i class="fas fa-globe"></i>
                            <div class="btn-text">
                                <span class="small">Visit</span>
                                <span class="large">Website</span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <!-- Back to Home -->
            <section class="back-section">
                <a href="../index.html" class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                    Back to Foodidu
                </a>
            </section>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <img src="../images/Logo-Text.svg" alt="Foodidu Logo" style="height: 40px;">
                </div>
                <p>&copy; 2024 Foodidu. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script src="../script.js"></script>
    <script>
        // ${vendor.name} specific JavaScript
        function copyPromoCode(code) {
            navigator.clipboard.writeText(code).then(function() {
                const copyBtn = document.querySelector('.copy-btn');
                const originalText = copyBtn.innerHTML;
                
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.classList.remove('copied');
                }, 2000);
                
                showNotification('Promo code copied to clipboard!', 'success');
            }).catch(function(err) {
                console.error('Failed to copy: ', err);
                showNotification('Failed to copy code. Please try again.', 'error');
            });
        }

        function downloadApp(platform) {
            let url = '';
            if (platform === 'ios') {
                url = 'https://apps.apple.com/app/foodidu';
            } else if (platform === 'android') {
                url = 'https://play.google.com/store/apps/details?id=com.foodidu';
            }
            if (url) window.open(url, '_blank');
        }

        function openVendorApp(vendor, platform) {
            const vendorApps = {
                '${vendorKey}': {
                    ios: '${vendor.iosApp}',
                    android: '${vendor.androidApp}'
                }
            };
            
            const url = vendorApps[vendor] && vendorApps[vendor][platform];
            if (url) window.open(url, '_blank');
        }

        function openVendorWebsite(vendor) {
            const vendorWebsites = {
                '${vendorKey}': '${vendor.website}'
            };
            
            const url = vendorWebsites[vendor];
            if (url) window.open(url, '_blank');
        }

        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = \`notification \${type}\`;
            notification.innerHTML = \`
                <div class="notification-content">
                    <i class="fas fa-\${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                    <span>\${message}</span>
                </div>
            \`;
            
            notification.style.cssText = \`
                position: fixed; top: 20px; right: 20px;
                background: \${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#3b82f6'};
                color: white; padding: 15px 20px; border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); z-index: 10000;
                animation: slideInRight 0.3s ease; max-width: 300px;
            \`;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => document.body.removeChild(notification), 300);
            }, 3000);
        }

        function toggleMenu() {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        }

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content { display: flex; align-items: center; gap: 10px; }
        \`;
        document.head.appendChild(style);
    </script>
</body>
</html>`;
}

// Generate vendor pages
function generateVendorPages() {
  const publicDir = path.join(__dirname, "public");

  Object.entries(vendors).forEach(([vendorKey, vendor]) => {
    const vendorDir = path.join(publicDir, vendorKey);

    // Create vendor directory if it doesn't exist
    if (!fs.existsSync(vendorDir)) {
      fs.mkdirSync(vendorDir, { recursive: true });
    }

    // Generate HTML file
    const htmlContent = generateHTML(vendorKey, vendor);
    const htmlPath = path.join(vendorDir, "index.html");

    fs.writeFileSync(htmlPath, htmlContent, "utf8");
    console.log(`✅ Generated: ${vendorKey}/index.html`);
  });

  console.log("\\n🎉 All vendor pages generated successfully!");
  console.log("\\n📁 Generated pages:");
  Object.keys(vendors).forEach((vendorKey) => {
    console.log(`   • foodidu.com/${vendorKey}`);
  });
}

// Run the generator
if (require.main === module) {
  generateVendorPages();
}

module.exports = { generateVendorPages, vendors };
