// Demo accounts data
const demoAccounts = {
    admin: {
        email: "admin@autoparts.com",
        password: "admin123",
        name: "مدير النظام",
        role: "super_admin"
    },
    manager: {
        email: "manager@autoparts.com",
        password: "manager123",
        name: "مدير محل",
        role: "manager"
    },
    employee: {
        email: "employee@autoparts.com",
        password: "employee123",
        name: "موظف",
        role: "employee"
    }
};

// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember');
const loginBtn = document.getElementById('loginBtn');
const loginBtnText = document.getElementById('loginBtnText');
const loginBtnIcon = document.getElementById('loginBtnIcon');
const togglePasswordBtn = document.getElementById('togglePassword');

// Toggle password visibility
togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});

// Fill demo account
function fillDemoAccount(accountType) {
    const account = demoAccounts[accountType];
    if (account) {
        emailInput.value = account.email;
        passwordInput.value = account.password;
        
        // Add visual feedback
        emailInput.classList.add('bg-opacity-30');
        passwordInput.classList.add('bg-opacity-30');
        
        setTimeout(() => {
            emailInput.classList.remove('bg-opacity-30');
            passwordInput.classList.remove('bg-opacity-30');
        }, 1000);
        
        showNotification(`تم ملء بيانات ${account.name}`, 'success');
    }
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

// Loading state
function setLoadingState(loading) {
    if (loading) {
        loginBtn.disabled = true;
        loginBtnText.textContent = 'جاري تسجيل الدخول...';
        loginBtnIcon.className = 'fas fa-spinner fa-spin mr-2';
    } else {
        loginBtn.disabled = false;
        loginBtnText.textContent = 'تسجيل الدخول';
        loginBtnIcon.className = 'fas fa-sign-in-alt mr-2';
    }
}

// Validate form
function validateForm() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!email) {
        showNotification('يرجى إدخال البريد الإلكتروني', 'error');
        emailInput.focus();
        return false;
    }
    
    if (!UTILS.validateEmail(email)) {
        showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
        emailInput.focus();
        return false;
    }
    
    if (!password) {
        showNotification('يرجى إدخال كلمة المرور', 'error');
        passwordInput.focus();
        return false;
    }
    
    if (password.length < 6) {
        showNotification('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
        passwordInput.focus();
        return false;
    }
    
    return true;
}

// Simulate login API call
function loginUser(email, password) {
    return new Promise((resolve, reject) => {
        // Simulate API delay
        setTimeout(() => {
            // Check if it's a demo account
            const demoAccount = Object.values(demoAccounts).find(account => 
                account.email === email && account.password === password
            );
            
            if (demoAccount) {
                resolve({
                    success: true,
                    user: {
                        id: 1,
                        name: demoAccount.name,
                        email: demoAccount.email,
                        role: demoAccount.role,
                        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(demoAccount.name)}&background=3b82f6&color=fff`
                    },
                    token: 'demo_token_' + Date.now()
                });
            } else {
                reject(new Error('بيانات الدخول غير صحيحة'));
            }
        }, 1500);
    });
}

// Handle form submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const remember = rememberCheckbox.checked;
    
    setLoadingState(true);
    
    try {
        const response = await loginUser(email, password);
        
        if (response.success) {
            // Store user data
            if (remember) {
                UTILS.storage.set(CONFIG.STORAGE_KEYS.USER_DATA, response.user);
                UTILS.storage.set(CONFIG.STORAGE_KEYS.USER_TOKEN, response.token);
            } else {
                sessionStorage.setItem(CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));
                sessionStorage.setItem(CONFIG.STORAGE_KEYS.USER_TOKEN, response.token);
            }
            
            showNotification('تم تسجيل الدخول بنجاح! جاري التوجيه...', 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        }
    } catch (error) {
        showNotification(error.message, 'error');
        setLoadingState(false);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter to submit form
    if (e.key === 'Enter' && (e.target === emailInput || e.target === passwordInput)) {
        loginForm.dispatchEvent(new Event('submit'));
    }
    
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

// Auto-focus email input on page load
document.addEventListener('DOMContentLoaded', function() {
    emailInput.focus();
    
    // Check if user is already logged in
    const userData = UTILS.storage.get(CONFIG.STORAGE_KEYS.USER_DATA) || 
                    JSON.parse(sessionStorage.getItem(CONFIG.STORAGE_KEYS.USER_DATA) || 'null');
    
    if (userData) {
        showNotification('مرحباً بعودتك! جاري التوجيه...', 'info');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
});

// Input validation on blur
emailInput.addEventListener('blur', function() {
    const email = this.value.trim();
    if (email && !UTILS.validateEmail(email)) {
        this.classList.add('border-red-500');
        showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
    } else {
        this.classList.remove('border-red-500');
    }
});

passwordInput.addEventListener('blur', function() {
    const password = this.value;
    if (password && password.length < 6) {
        this.classList.add('border-red-500');
        showNotification('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error');
    } else {
        this.classList.remove('border-red-500');
    }
});

// Input validation on input
emailInput.addEventListener('input', function() {
    this.classList.remove('border-red-500');
});

passwordInput.addEventListener('input', function() {
    this.classList.remove('border-red-500');
});

// Add some visual effects
document.addEventListener('DOMContentLoaded', function() {
    // Add typing effect to title
    const title = document.querySelector('h1');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 500);
    
    // Add entrance animation to form
    const form = document.querySelector('.glass-effect');
    form.style.opacity = '0';
    form.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        form.style.transition = 'all 0.6s ease-out';
        form.style.opacity = '1';
        form.style.transform = 'translateY(0)';
    }, 300);
});

// Export functions for global access
window.fillDemoAccount = fillDemoAccount;
window.showNotification = showNotification; 