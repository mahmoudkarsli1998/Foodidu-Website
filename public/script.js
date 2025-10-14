// Global fallback for legacy script reference and downloadApp shim
(function() {
  // Avoid overriding if already defined
  if (typeof window.downloadApp !== 'function') {
    window.downloadApp = function() {
      if (typeof window.showComingSoonModal === 'function') {
        window.showComingSoonModal();
      } else {
        // Lightweight fallback
        alert('Foodidu App is coming soon!');
      }
    };
  }

  // Optional: small log to confirm shim loaded
  if (!window.__foodidu_legacy_shim_logged) {
    try { console.debug('[Foodidu] legacy script shim loaded'); } catch (e) {}
    window.__foodidu_legacy_shim_logged = true;
  }
})();
