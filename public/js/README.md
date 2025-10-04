# JavaScript Modules Structure

This directory contains the refactored JavaScript code, split into separate modules for better maintainability and organization.

## File Structure

### Core Files
- **`main.js`** - Main initialization file that imports and coordinates all modules
- **`config.js`** - Configuration constants and settings
- **`state.js`** - Global application state management
- **`data.js`** - Sample data for deals, restaurants, and promo codes
- **`utils.js`** - Utility functions (notifications, loading, animations)

### Feature Modules
- **`navigation.js`** - Page navigation and mobile menu functionality
- **`carousel.js`** - Hero carousel functionality
- **`deals.js`** - Deals page functionality (filtering, loading, pagination)
- **`discovery.js`** - Restaurant discovery page functionality
- **`promo-codes.js`** - Promo codes page functionality
- **`vendor-form.js`** - Vendor application form handling
- **`exclusive-carousel.js`** - Exclusive deals carousel functionality
- **`ui-effects.js`** - UI effects, animations, and interactive features

## Usage

The HTML file includes only the main.js file as a module:
```html
<script type="module" src="js/main.js"></script>
```

All functions that need to be accessible from HTML onclick handlers are exported to the global window object in main.js.

## Benefits of This Structure

1. **Modularity** - Each feature is in its own file
2. **Maintainability** - Easier to find and modify specific functionality
3. **Reusability** - Modules can be imported where needed
4. **Performance** - Better code organization and potential for tree-shaking
5. **Debugging** - Easier to isolate and fix issues
6. **Collaboration** - Multiple developers can work on different modules

## Migration Notes

- The original `script.js` has been completely refactored
- All functionality has been preserved and organized into appropriate modules
- Global functions are still available for HTML onclick handlers
- ES6 modules are used with import/export statements