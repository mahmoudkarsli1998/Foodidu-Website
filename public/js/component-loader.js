// Component Loader - Handles loading HTML components
function ComponentLoader() {
  this.loadedComponents = new Set();

  // Load a single component
  this.loadComponent = function (componentPath, targetSelector, callback, position, forceReload) {
    if (this.loadedComponents.has(componentPath) && !forceReload) {
      if (callback) callback();
      return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", componentPath, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var targetElement = document.querySelector(targetSelector);
          if (targetElement) {
            if (targetSelector === "body") {
              // Use position parameter to determine where to insert
              var insertPosition = position || "afterbegin";
              targetElement.insertAdjacentHTML(insertPosition, xhr.responseText);
            } else {
              if (forceReload) {
                // For force reload, replace content instead of appending
                targetElement.innerHTML = xhr.responseText;
              } else {
                targetElement.innerHTML += xhr.responseText;
              }
            }
            this.loadedComponents.add(componentPath);
          }
          if (callback) callback();
        } else {
          console.error("Failed to load component:", componentPath);
          if (callback) callback();
        }
      }
    }.bind(this);
    xhr.send();
  };

  // Load multiple components in parallel for faster loading
  this.loadMultipleComponents = function (components, callback) {
    var loadedCount = 0;
    var totalComponents = components.length;
    var self = this;

    if (totalComponents === 0) {
      if (callback) callback();
      return;
    }

    function onComponentLoaded() {
      loadedCount++;
      if (loadedCount === totalComponents) {
        if (callback) callback();
      }
    }

    // Load all components in parallel
    components.forEach(function(component) {
      self.loadComponent(component.path, component.target, onComponentLoaded, component.position);
    });
  };

  // Load all components optimized for speed
  this.loadAllComponents = function (callback) {
    var self = this;

    // Load critical above-the-fold components first
    var criticalComponents = [
      { path: "components/navigation.html", target: "body" },
      { path: "components/hero-carousel.html", target: "#home-components" },
    ];

    self.loadMultipleComponents(criticalComponents, function () {
      // Show the page once critical components are loaded
      const homePage = document.getElementById('home');
      if (homePage) {
        homePage.classList.add('ready');
      }
      
      // Load remaining components in parallel
      var remainingComponents = [
        { path: "components/cookie-consent.html", target: "body" },
        { path: "components/exclusive-deals.html", target: "#home-components" },
        { path: "components/hot-promos.html", target: "#home-components" },
        { path: "components/features.html", target: "#home-components" },
        { path: "components/how-it-works.html", target: "#home-components" },
        { path: "components/vendor-invitation.html", target: "#home-components" },
        { path: "components/app-screenshots.html", target: "#home-components" },
        { path: "components/testimonials.html", target: "#home-components" },
        { path: "components/cta-section.html", target: "#home-components" },
        { path: "pages/deals-page.html", target: "#pages-container" },
        { path: "pages/discovery-page.html", target: "#pages-container" },
        { path: "pages/promo-page.html", target: "#pages-container" },
        { path: "pages/vendors-page.html", target: "#pages-container" },
        { path: "components/footer.html", target: "body", position: "beforeend" },
      ];

      self.loadMultipleComponents(remainingComponents, function() {
        // Show home components once loaded
        const homeComponents = document.getElementById('home-components');
        if (homeComponents) {
          homeComponents.classList.add('loaded');
        }
        if (callback) callback();
      });
    });
  };

  // Force reload a component (useful for ensuring components are always visible)
  this.forceReloadComponent = function(componentPath, targetSelector, callback) {
    // Remove from loaded components set to force reload
    this.loadedComponents.delete(componentPath);
    this.loadComponent(componentPath, targetSelector, callback, null, true);
  };


}

// Initialize component loader
var componentLoader = new ComponentLoader();

// Export for use in other files
window.componentLoader = componentLoader;
