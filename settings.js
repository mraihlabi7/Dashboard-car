// DOM Elements
const saveSettingsBtn = document.getElementById('saveSettingsBtn');
const settingsNavItems = document.querySelectorAll('.settings-nav-item');
const settingsSections = document.querySelectorAll('.settings-section');

// Settings data
let settings = {
    general: {
        companyName: 'أوتو بارتس',
        companyEmail: 'info@autoparts.com',
        companyPhone: '+966501234567',
        companyAddress: 'شارع الملك فهد، الرياض، المملكة العربية السعودية',
        timezone: 'Asia/Riyadh',
        currency: 'SAR'
    },
    appearance: {
        theme: 'light',
        primaryColor: 'blue',
        animations: true,
        showNotifications: true
    },
    notifications: {
        email: true,
        stock: true,
        orders: true,
        system: false
    },
    security: {
        twoFactorAuth: false,
        autoLogout: true
    },
    backup: {
        autoBackup: true,
        backupCount: '14'
    }
};

// Load settings from localStorage
function loadSettings() {
    const savedSettings = UTILS.storage.get('app_settings');
    if (savedSettings) {
        settings = { ...settings, ...savedSettings };
    }
    applySettings();
}

// Save settings to localStorage
function saveSettings() {
    UTILS.storage.set('app_settings', settings);
    showNotification('تم حفظ الإعدادات بنجاح!', 'success');
}

// Apply settings to UI
function applySettings() {
    // General settings
    document.getElementById('companyName').value = settings.general.companyName;
    document.getElementById('companyEmail').value = settings.general.companyEmail;
    document.getElementById('companyPhone').value = settings.general.companyPhone;
    document.getElementById('companyAddress').value = settings.general.companyAddress;
    document.getElementById('timezone').value = settings.general.timezone;
    document.getElementById('currency').value = settings.general.currency;
    
    // Appearance settings
    document.querySelector(`input[name="theme"][value="${settings.appearance.theme}"]`).checked = true;
    document.getElementById('animations').checked = settings.appearance.animations;
    document.getElementById('showNotifications').checked = settings.appearance.showNotifications;
    
    // Update color options
    updateColorSelection(settings.appearance.primaryColor);
    
    // Notification settings
    document.getElementById('emailNotifications').checked = settings.notifications.email;
    document.getElementById('stockNotifications').checked = settings.notifications.stock;
    document.getElementById('orderNotifications').checked = settings.notifications.orders;
    document.getElementById('systemNotifications').checked = settings.notifications.system;
    
    // Security settings
    document.getElementById('twoFactorAuth').checked = settings.security.twoFactorAuth;
    document.getElementById('autoLogout').checked = settings.security.autoLogout;
    
    // Backup settings
    document.getElementById('autoBackup').checked = settings.backup.autoBackup;
    document.getElementById('backupCount').value = settings.backup.backupCount;
}

// Update color selection
function updateColorSelection(color) {
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('border-blue-600');
        option.classList.add('border-transparent');
    });
    
    const selectedOption = document.querySelector(`[data-color="${color}"]`);
    if (selectedOption) {
        selectedOption.classList.remove('border-transparent');
        selectedOption.classList.add('border-blue-600');
    }
}

// Navigation between settings sections
function showSection(sectionId) {
    // Hide all sections
    settingsSections.forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
    }
    
    // Update navigation active state
    settingsNavItems.forEach(item => {
        item.classList.remove('active', 'bg-blue-50', 'text-blue-600');
    });
    
    const activeNavItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active', 'bg-blue-50', 'text-blue-600');
    }
}

// Collect settings from form
function collectSettings() {
    // General settings
    settings.general.companyName = document.getElementById('companyName').value;
    settings.general.companyEmail = document.getElementById('companyEmail').value;
    settings.general.companyPhone = document.getElementById('companyPhone').value;
    settings.general.companyAddress = document.getElementById('companyAddress').value;
    settings.general.timezone = document.getElementById('timezone').value;
    settings.general.currency = document.getElementById('currency').value;
    
    // Appearance settings
    const selectedTheme = document.querySelector('input[name="theme"]:checked');
    if (selectedTheme) {
        settings.appearance.theme = selectedTheme.value;
    }
    settings.appearance.animations = document.getElementById('animations').checked;
    settings.appearance.showNotifications = document.getElementById('showNotifications').checked;
    
    // Notification settings
    settings.notifications.email = document.getElementById('emailNotifications').checked;
    settings.notifications.stock = document.getElementById('stockNotifications').checked;
    settings.notifications.orders = document.getElementById('orderNotifications').checked;
    settings.notifications.system = document.getElementById('systemNotifications').checked;
    
    // Security settings
    settings.security.twoFactorAuth = document.getElementById('twoFactorAuth').checked;
    settings.security.autoLogout = document.getElementById('autoLogout').checked;
    
    // Backup settings
    settings.backup.autoBackup = document.getElementById('autoBackup').checked;
    settings.backup.backupCount = document.getElementById('backupCount').value;
}

// Change password function
function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
        showNotification('يرجى ملء جميع حقول كلمة المرور', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showNotification('كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل', 'error');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('كلمة المرور الجديدة وتأكيدها غير متطابقين', 'error');
        return;
    }
    
    showNotification('جاري تغيير كلمة المرور...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        showNotification('تم تغيير كلمة المرور بنجاح!', 'success');
        
        // Clear password fields
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    }, 1500);
}

// Create backup function
function createBackup() {
    showNotification('جاري إنشاء النسخة الاحتياطية...', 'info');
    
    // Simulate backup process
    setTimeout(() => {
        const backupData = {
            timestamp: new Date().toISOString(),
            settings: settings,
            data: {
                products: [],
                orders: [],
                customers: []
            }
        };
        
        // Create and download backup file
        const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('تم إنشاء النسخة الاحتياطية بنجاح!', 'success');
    }, 2000);
}

// Restore backup function
function restoreBackup() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const backupData = JSON.parse(e.target.result);
                    showNotification('جاري استعادة النسخة الاحتياطية...', 'info');
                    
                    setTimeout(() => {
                        settings = backupData.settings;
                        applySettings();
                        showNotification('تم استعادة النسخة الاحتياطية بنجاح!', 'success');
                    }, 1500);
                } catch (error) {
                    showNotification('خطأ في قراءة ملف النسخة الاحتياطية', 'error');
                }
            };
            reader.readAsText(file);
        }
    };
    
    input.click();
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
    
    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    
    notification.className += ` ${colors[type]}`;
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.getElementById('notificationContainer').appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load settings
    loadSettings();
    
    // Navigation event listeners
    settingsNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });
    
    // Save settings button
    saveSettingsBtn.addEventListener('click', function() {
        collectSettings();
        saveSettings();
    });
    
    // Color selection
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            settings.appearance.primaryColor = color;
            updateColorSelection(color);
        });
    });
    
    // Change password button
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', changePassword);
    }
    
    // Backup buttons
    const createBackupBtn = document.getElementById('createBackupBtn');
    const restoreBackupBtn = document.getElementById('restoreBackupBtn');
    
    if (createBackupBtn) {
        createBackupBtn.addEventListener('click', createBackup);
    }
    
    if (restoreBackupBtn) {
        restoreBackupBtn.addEventListener('click', restoreBackup);
    }
    
    // Auto-save on input change
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            collectSettings();
            // Auto-save after a delay
            clearTimeout(window.autoSaveTimeout);
            window.autoSaveTimeout = setTimeout(() => {
                saveSettings();
            }, 2000);
        });
    });
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('مرحباً بك في صفحة الإعدادات!', 'info');
    }, 1000);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save settings
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        collectSettings();
        saveSettings();
    }
    
    // Escape to go back
    if (e.key === 'Escape') {
        window.history.back();
    }
});

// Export functions for global access
window.changePassword = changePassword;
window.createBackup = createBackup;
window.restoreBackup = restoreBackup;
window.showNotification = showNotification; 