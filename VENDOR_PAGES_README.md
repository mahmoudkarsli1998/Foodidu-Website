# Foodidu Vendor Pages System

## 📁 Structure Overview

```
public/
├── index.html                 → foodidu.com (homepage)
├── style.css                 → main styles
├── script.js                 → main JavaScript
├── images/                   → vendor logos and assets
├── rabbit/
│   ├── index.html           → foodidu.com/rabbit
│   ├── vendor-page.css      → shared vendor page styles
│   └── vendor-page.js       → shared vendor page JavaScript
├── breadfast/
│   └── index.html           → foodidu.com/breadfast
├── pizza-hut/
│   └── index.html           → foodidu.com/pizza-hut
├── kfc/
│   └── index.html           → foodidu.com/kfc
├── burger-king/
│   └── index.html           → foodidu.com/burger-king
└── starbucks/
    └── index.html           → foodidu.com/starbucks
```

## 🎯 Features

### ✅ Implemented Features
- **Responsive Design**: Works perfectly on desktop and mobile
- **Vendor Logo Display**: Clean, prominent logo positioning
- **Promo Code Section**: Large, copyable promo codes with animations
- **Copy-to-Clipboard**: One-click promo code copying with feedback
- **Download Buttons**: Foodidu app + vendor app/website links
- **Consistent Navigation**: Back to homepage functionality
- **SEO Optimized**: Meta tags, Open Graph, structured data
- **Performance**: Shared CSS/JS files for fast loading

### 🎨 Design Guidelines
- **Clean Background**: White/light gradient to highlight logos
- **Responsive Layout**: 
  - Desktop: Buttons displayed inline
  - Mobile: Buttons stacked vertically
- **Consistent Sizing**: Uniform logo and button dimensions
- **Visual Focus**: Promo code is the main visual element
- **Brand Colors**: Foodidu yellow (#ffe082) accent throughout

## 🚀 Adding a New Vendor

### Method 1: Using the Generator Script (Recommended)

1. **Edit the vendor configuration** in `vendor-generator.js`:

```javascript
const vendors = {
    // Add your new vendor here
    'new-vendor': {
        name: 'New Vendor Name',
        logo: 'vendor-logo.svg',           // File in public/images/
        promoCode: 'SAVE20',
        discount: '20% Off First Order',
        description: 'Save 20% on your first order',
        expiry: 'Dec 31, 2025',
        badge: 'New User',                 // Badge text
        iosApp: 'https://apps.apple.com/app/vendor',
        androidApp: 'https://play.google.com/store/apps/details?id=com.vendor',
        website: 'https://vendor.com'
    }
};
```

2. **Add the vendor logo** to `public/images/`

3. **Run the generator**:
```bash
node vendor-generator.js
```

4. **Deploy to Firebase**:
```bash
firebase deploy
```

### Method 2: Manual Creation

1. **Create vendor folder**: `public/vendor-name/`
2. **Copy template**: Use `public/rabbit/index.html` as template
3. **Customize content**:
   - Update vendor name, logo, promo code
   - Update meta tags and title
   - Update app/website links
4. **Test locally** and deploy

## 📱 Vendor Page Components

### 1. Vendor Header
- **Logo**: Max 150px, clean background, rounded corners
- **Name**: Large, bold vendor name
- **Description**: Brief tagline about savings

### 2. Promo Code Section
- **Animated Background**: Gradient with shimmer effect
- **Large Promo Code**: Dashed border, easy to read
- **Copy Button**: Instant clipboard copy with feedback
- **Badge**: "Limited Time", "Hot Deal", etc.
- **Details**: Discount amount and expiry date

### 3. Download Section
- **Foodidu App**: Links to App Store and Google Play
- **Vendor App/Website**: Direct links to vendor platforms
- **Responsive Buttons**: Stack on mobile, inline on desktop

### 4. Navigation & Footer
- **Back Button**: Return to Foodidu homepage
- **Consistent Branding**: Foodidu logo and colors

## 🔧 Customization Options

### Promo Code Badges
```javascript
// Available badge styles
'Limited Time'    // Red, pulsing animation
'Hot Deal'        // Red, pulsing animation  
'New User'        // Red, pulsing animation
'BOGO Deal'       // Red, pulsing animation
'Family Deal'     // Red, pulsing animation
```

### Button Colors
```css
.app-store     { background: #000; }      /* Black */
.google-play   { background: #01875f; }   /* Green */
.website       { background: #3b82f6; }   /* Blue */
```

### Logo Guidelines
- **Format**: SVG preferred, PNG acceptable
- **Size**: Minimum 150x150px for clarity
- **Background**: Transparent or white
- **Style**: Clean, professional, recognizable

## 🌐 SEO & Analytics

### Meta Tags Template
```html
<meta name="description" content="Get exclusive [Vendor] promo codes and discounts with Foodidu.">
<meta name="keywords" content="[Vendor] promo codes, [Vendor] discounts, food delivery deals">
<meta property="og:title" content="[Vendor] Promo Codes - Foodidu">
<meta property="og:image" content="../images/[vendor-logo]">
<meta property="og:url" content="https://foodidu.com/[vendor-slug]">
```

### Analytics Tracking
The system includes built-in event tracking for:
- Promo code copies
- App download attempts  
- Vendor app/website clicks
- Page views

## 📱 Mobile Optimization

### Responsive Breakpoints
- **Desktop**: > 768px - Inline button layout
- **Tablet**: 481px - 768px - Adjusted spacing
- **Mobile**: < 480px - Stacked layout, larger touch targets

### Touch-Friendly Design
- **Button Size**: Minimum 44px height for easy tapping
- **Spacing**: Adequate gaps between interactive elements
- **Copy Button**: Large, prominent for easy access

## 🚀 Deployment Workflow

### Firebase Hosting
1. **Test Locally**: Open `public/vendor-name/index.html`
2. **Deploy**: `firebase deploy`
3. **Verify**: Check `foodidu.com/vendor-name`

### URL Structure
- Homepage: `foodidu.com`
- Vendor pages: `foodidu.com/vendor-name`
- Clean URLs, no file extensions needed

## 🔍 Testing Checklist

### Before Deployment
- [ ] Logo displays correctly (no broken images)
- [ ] Promo code copies to clipboard
- [ ] All download buttons work
- [ ] Mobile layout looks good
- [ ] Back button returns to homepage
- [ ] Meta tags are updated
- [ ] Page loads quickly

### Cross-Browser Testing
- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)  
- [ ] Firefox
- [ ] Edge

## 📊 Performance Tips

### Optimization
- **Shared Resources**: CSS/JS files shared across vendor pages
- **Image Optimization**: Compress logos, use SVG when possible
- **Lazy Loading**: Images load as needed
- **Caching**: Firebase hosting provides automatic caching

### Loading Speed
- **Target**: < 2 seconds first load
- **Shared Assets**: Cached after first vendor page visit
- **Minimal JavaScript**: Only essential functionality

## 🎨 Brand Consistency

### Foodidu Colors
```css
--primary-yellow: #ffe082;
--dark-text: #1a202c;
--light-gray: #64748b;
--success-green: #059669;
--error-red: #dc2626;
```

### Typography
- **Headers**: Bold, clear hierarchy
- **Body Text**: Readable, sufficient contrast
- **Promo Codes**: Large, distinctive styling

## 🔄 Maintenance

### Regular Updates
- **Promo Codes**: Update codes and expiry dates
- **App Links**: Verify download links work
- **Logo Updates**: Replace with new vendor branding
- **Performance**: Monitor loading speeds

### Content Management
- **Seasonal Promotions**: Update badges and codes
- **New Vendors**: Add using generator script
- **Expired Deals**: Remove or update promptly

---

## 🎉 Quick Start

1. **Add vendor logo** to `public/images/`
2. **Edit** `vendor-generator.js` with vendor details
3. **Run** `node vendor-generator.js`
4. **Deploy** `firebase deploy`
5. **Test** `foodidu.com/vendor-name`

Your new vendor page is live! 🚀