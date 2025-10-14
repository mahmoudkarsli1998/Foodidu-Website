// Coming Soon Modal for Foodidu App
function showComingSoonModal() {
    // Remove existing modal if any
    const existingModal = document.getElementById('coming-soon-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal HTML
    const modalHTML = `
        <div id="coming-soon-modal" class="coming-soon-modal show">
            <div class="coming-soon-overlay" onclick="closeComingSoonModal()"></div>
            <div class="coming-soon-content">
                <button class="coming-soon-close" onclick="closeComingSoonModal()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="coming-soon-icon">
                    <i class="fas fa-mobile-alt"></i>
                </div>
                <h2>Foodidu App Coming Soon!</h2>
                <p>We're working hard to bring you the best food delivery experience. Our mobile app will be available soon with exclusive features and deals!</p>
                <div class="coming-soon-features">
                    <div class="feature-item">
                        <i class="fas fa-rocket"></i>
                        <span>Faster Ordering</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-gift"></i>
                        <span>Exclusive Deals</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-bell"></i>
                        <span>Push Notifications</span>
                    </div>
                </div>
                <div class="coming-soon-buttons">
                    <button class="notify-btn" onclick="notifyWhenReady()">
                        <i class="fas fa-envelope"></i>
                        Notify Me When Ready
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add modal to body and show immediately
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeComingSoonModal() {
    const modal = document.getElementById('coming-soon-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function notifyWhenReady() {
    // Show success message
    const notifyBtn = document.querySelector('.notify-btn');
    if (notifyBtn) {
        notifyBtn.innerHTML = '<i class="fas fa-check"></i> We\'ll notify you!';
        notifyBtn.style.background = '#10b981';
        notifyBtn.disabled = true;
        
        setTimeout(() => {
            closeComingSoonModal();
        }, 1500);
    }
}

// Replace all downloadApp functions
function downloadApp(platform = null) {
    showComingSoonModal();
}

// Make functions globally available
window.showComingSoonModal = showComingSoonModal;
window.closeComingSoonModal = closeComingSoonModal;
window.notifyWhenReady = notifyWhenReady;
window.downloadApp = downloadApp;