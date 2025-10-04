# CSS Architecture Documentation

This directory contains the refactored CSS files for the Foodidu project. The original monolithic `style.css` file has been split into modular, feature-specific CSS files for better maintainability and organization.

## File Structure

### Core Files
- **`main.css`** - Main CSS file that imports all other CSS modules
- **`base.css`** - Base styles, reset, utilities, and global components

### Component-Specific Files
- **`navigation.css`** - Navigation bar, mobile menu, and drawer styles
- **`carousel.css`** - Hero carousel and slide animations
- **`features.css`** - Features section, how-it-works, and app screenshots
- **`deals.css`** - Deals page, filters, and deal cards
- **`promo-codes.css`** - Promo codes page and promo card styles
- **`exclusive-deals.css`** - Auto-sliding exclusive deals section
- **`featured-cards.css`** - Featured promo cards (Rabbit, Senem)
- **`vendor-cards.css`** - Vendor-specific card styles and hot promos
- **`discovery.css`** - Discovery page, search, and restaurant grid
- **`vendor-page.css`** - Vendor registration page and forms
- **`testimonials.css`** - Testimonials section and partner logos
- **`cta-section.css`** - Call-to-action sections and app download buttons
- **`footer.css`** - Footer styles and social icons
- **`cookie-consent.css`** - Cookie consent banner
- **`animations.css`** - Animation classes and keyframes

## Usage

### In HTML
```html
<link rel="stylesheet" href="css/main.css" />
```

### Individual Module Import (if needed)
```css
@import url('css/navigation.css');
@import url('css/carousel.css');
```

## Benefits of This Structure

1. **Maintainability** - Each feature has its own CSS file
2. **Modularity** - Easy to add/remove features
3. **Performance** - Can load only needed CSS modules
4. **Team Collaboration** - Multiple developers can work on different modules
5. **Debugging** - Easier to locate and fix styles
6. **Code Organization** - Logical separation of concerns

## Migration Notes

- The original `style.css` now imports `css/main.css` for backward compatibility
- All existing functionality is preserved
- No changes needed in HTML files (except updating the main CSS link)
- Original file backed up as `style.css.backup`

## Adding New Styles

When adding new features:
1. Create a new CSS file in the `/css` directory
2. Add the import to `main.css`
3. Follow the existing naming conventions
4. Include responsive styles in the same file

## Responsive Design

Each CSS module includes its own responsive styles using media queries:
- Mobile: `@media (max-width: 768px)`
- Tablet: `@media (max-width: 1024px)`
- Desktop: `@media (min-width: 1025px)`

## Browser Support

The CSS modules maintain the same browser support as the original:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- CSS Custom Properties (variables) used throughout