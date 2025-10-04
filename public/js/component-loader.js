// Component Loader - Handles loading HTML components
function ComponentLoader() {
  this.loadedComponents = new Set();

  // Load a single component
  this.loadComponent = function (componentPath, targetSelector, callback, position) {
    if (this.loadedComponents.has(componentPath)) {
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
              targetElement.innerHTML += xhr.responseText;
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

  // Load multiple components sequentially
  this.loadMultipleComponents = function (components, callback) {
    var index = 0;
    var self = this;

    function loadNext() {
      if (index >= components.length) {
        if (callback) callback();
        return;
      }

      var component = components[index];
      index++;
      self.loadComponent(component.path, component.target, loadNext, component.position);
    }

    loadNext();
  };

  // Load all components in sequence
  this.loadAllComponents = function (callback) {
    var self = this;

    // First load shared components
    var sharedComponents = [
      { path: "components/cookie-consent.html", target: "body" },
      { path: "components/navigation.html", target: "body" },
    ];

    self.loadMultipleComponents(sharedComponents, function () {
      // Then load home components
      var homeComponents = [
        { path: "components/hero-carousel.html", target: "#home-components" },
        { path: "components/exclusive-deals.html", target: "#home-components" },
        { path: "components/hot-promos.html", target: "#home-components" },
        { path: "components/features.html", target: "#home-components" },
        { path: "components/how-it-works.html", target: "#home-components" },
        {
          path: "components/vendor-invitation.html",
          target: "#home-components",
        },
        { path: "components/app-screenshots.html", target: "#home-components" },
      ];

      self.loadMultipleComponents(homeComponents, function () {
        // Then load page components
        var pageComponents = [
          { path: "pages/deals-page.html", target: "#pages-container" },
          { path: "pages/discovery-page.html", target: "#pages-container" },
          { path: "pages/promo-page.html", target: "#pages-container" },
          { path: "pages/vendors-page.html", target: "#pages-container" },
        ];

        self.loadMultipleComponents(pageComponents, function () {
          // Finally load footer at the end of body
          self.loadComponent("components/footer.html", "body", callback, "beforeend");
        });
      });
    });
  };
}

// Initialize component loader
var componentLoader = new ComponentLoader();

// Export for use in other files
window.componentLoader = componentLoader;
