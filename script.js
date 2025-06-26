// DOM Elements
const sidebar = document.getElementById('sidebar');
const openSidebarBtn = document.getElementById('openSidebar');
const closeSidebarBtn = document.getElementById('closeSidebar');
const mobileOverlay = document.getElementById('mobileOverlay');
const navItems = document.querySelectorAll('.nav-item');

// Check if elements exist before proceeding
if (!sidebar || !openSidebarBtn || !closeSidebarBtn || !mobileOverlay) {
    console.log('Some sidebar elements are missing');
}

// Sidebar Toggle Functions
function openSidebar() {
    sidebar?.classList.remove('translate-x-full');
    mobileOverlay?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar?.classList.add('translate-x-full');
    mobileOverlay?.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Event Listeners
openSidebarBtn?.addEventListener('click', openSidebar);
closeSidebarBtn?.addEventListener('click', closeSidebar);
mobileOverlay?.addEventListener('click', closeSidebar);

// Navigation Active State
// navItems.forEach(item => {
//     console.log('gg');
//     item.addEventListener('click', function(e) {
//         console.log('clicked');
//         e.preventDefault();
        
//         // Remove active class from all items
//         navItems.forEach(nav => nav.classList.remove('active', 'bg-blue-50', 'text-blue-600'));
        
//         // Add active class to clicked item
//         this.classList.add('active', 'bg-blue-50', 'text-blue-600');
        
//         // Close sidebar on mobile after navigation
//         if (window.innerWidth < 1024) {
//             closeSidebar();
//         }
//     });
// });

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    if (!element) return;
    
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        if (!element) return;
        
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Initialize counters when page loads
if (document) {
    document.addEventListener('DOMContentLoaded', function() {
        const counters = document.querySelectorAll('.text-2xl.font-bold');
        if (counters.length > 0) {
            counters.forEach(counter => {
                if (counter && counter.textContent && typeof animateCounter === 'function') {
                    const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                    if (!isNaN(target)) {
                        animateCounter(counter, target);
                    }
                }
            });
        }
    });
}

// Notification System
class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.createNotificationContainer();
    }

    createNotificationContainer() {
        const existingContainer = document.getElementById('notification-container');
        if (existingContainer) {
            return;
        }
        
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'fixed top-4 left-4 z-50 space-y-2';
        if (document.body) {
            document.body.appendChild(container);
        }
    }

    show(message, type = 'info', duration = 5000) {
        if (!message) return;
        
        const notification = document.createElement('div');
        notification.className = `notification p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
        
        const colors = {
            success: 'bg-green-500 text-white',
            error: 'bg-red-500 text-white',
            warning: 'bg-yellow-500 text-white',
            info: 'bg-blue-500 text-white'
        };
        
        notification.className += ` ${colors[type] || colors.info}`;
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="if(this.parentElement && this.parentElement.parentElement) this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        const notificationContainer = document.getElementById('notification-container');
        if (notificationContainer) {
            notificationContainer.appendChild(notification);
            
            // Animate in
            setTimeout(() => {
                if (notification) {
                    notification.classList.remove('translate-x-full');
                }
            }, 100);
            
            // Auto remove
            setTimeout(() => {
                if (notification) {
                    notification.classList.add('translate-x-full');
                    setTimeout(() => {
                        if (notification && notification.parentNode) {
                            notification.remove();
                        }
                    }, 300);
                }
            }, duration);
        }
    }
}

// Initialize notification system
const notifications = new NotificationSystem();

// Search Functionality
function initializeSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'البحث في المنتجات...';
    searchInput.className = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent';
    
    // Add search to header
    const header = document.querySelector('header .flex.items-center.justify-between');
    if (header) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'hidden md:block flex-1 max-w-md mx-4';
        searchContainer.appendChild(searchInput);
        
        if (header.lastElementChild) {
            header.insertBefore(searchContainer, header.lastElementChild);
        } else {
            header.appendChild(searchContainer);
        }
        
        searchInput.addEventListener('input', function(e) {
            // Implement search logic here
            console.log('Searching for:', e.target.value);
        });
    }
}

// Chart Animation (Placeholder for real charts)
function initializeCharts() {
    const chartContainers = document.querySelectorAll('.h-64.bg-gray-50');
    
    if (chartContainers.length > 0) {
        chartContainers.forEach(container => {
            if (container) {
                container.addEventListener('click', function() {
                    if (notifications) {
                        notifications.show('سيتم إضافة الرسوم البيانية قريباً', 'info');
                    }
                });
            }
        });
    }
}

// Data Refresh Simulation
function simulateDataRefresh() {
    setInterval(() => {
        // Simulate real-time data updates
        const statsCards = document.querySelectorAll('.text-2xl.font-bold');
        if (statsCards.length > 0) {
            statsCards.forEach(card => {
                if (card && card.textContent && typeof animateCounter === 'function') {
                    const currentValue = parseInt(card.textContent.replace(/[^\d]/g, ''));
                    if (!isNaN(currentValue)) {
                        const newValue = currentValue + Math.floor(Math.random() * 10);
                        animateCounter(card, newValue, 1000);
                    }
                }
            });
        }
    }, 30000); // Update every 30 seconds
}

// Keyboard Shortcuts
if (document) {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[placeholder*="البحث"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to close sidebar
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });
}

// Responsive Design Enhancements
function handleResize() {
    if (window.innerWidth >= 1024) {
        closeSidebar();
    }
}

if (window) {
    window.addEventListener('resize', handleResize);
}

// Loading Animation
function showLoading() {
    const existingLoading = document.getElementById('loading');
    if (existingLoading) {
        existingLoading.remove();
    }
    
    const loading = document.createElement('div');
    loading.id = 'loading';
    loading.className = 'fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50';
    loading.innerHTML = `
        <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p class="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
    `;
    if (document.body) {
        document.body.appendChild(loading);
    }
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading && loading.parentNode) {
        loading.remove();
    }
}

// Export functions for global access
if (window) {
    window.notifications = notifications;
    window.showLoading = showLoading;
    window.hideLoading = hideLoading;
}

// Set active navigation item based on current page
// function setActiveNavigationItem() {
//     if (!window || !window.location) return;
    
//     const currentPage = window.location.pathname.split('/').pop() || 'index.html';
//     const navItems = document.querySelectorAll('.nav-item');
    
//     if (navItems.length > 0) {
//         navItems.forEach(item => {
//             if (item) {
//                 const href = item.getAttribute('href');
//                 if (href === currentPage) {
//                     item.classList.add('active', 'bg-blue-50', 'text-blue-600');
//                 } else {
//                     item.classList.remove('active', 'bg-blue-50', 'text-blue-600');
//                 }
//             }
//         });
//     }
// }

// Call setActiveNavigationItem when page loads
// if (document) {
//     document.addEventListener('DOMContentLoaded', function() {
//         setActiveNavigationItem();
//     });
// }

// Error handling for missing elements
if (window) {
    window.addEventListener('error', function(e) {
        if (e.message.includes('Cannot read properties of null')) {
            console.log('Attempted to access null element:', e.filename, e.lineno);
        }
    });
} 