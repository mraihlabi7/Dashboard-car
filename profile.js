// User profile data
let userProfile = {
    firstName: 'أحمد',
    lastName: 'محمد',
    email: 'ahmed@autoparts.com',
    phone: '+966501234567',
    birthDate: '1990-01-15',
    gender: 'male',
    address: 'شارع الملك فهد، الرياض، المملكة العربية السعودية',
    jobTitle: 'مدير النظام',
    department: 'إدارة النظام',
    hireDate: '2020-03-01',
    salary: '15,000 ر.س',
    manager: 'محمد أحمد',
    employmentStatus: 'active',
    avatar: 'https://ui-avatars.com/api/?name=أحمد+محمد&size=96&background=3b82f6&color=fff'
};

// DOM Elements
const saveProfileBtn = document.getElementById('saveProfileBtn');
const editProfileBtn = document.getElementById('editProfileBtn');
const profileAvatar = document.getElementById('profileAvatar');
const avatarInput = document.getElementById('avatarInput');

// Form elements
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const birthDate = document.getElementById('birthDate');
const gender = document.getElementById('gender');
const address = document.getElementById('address');
const jobTitle = document.getElementById('jobTitle');
const department = document.getElementById('department');
const hireDate = document.getElementById('hireDate');
const salary = document.getElementById('salary');
const manager = document.getElementById('manager');
const employmentStatus = document.getElementById('employmentStatus');

// Load profile data
function loadProfile() {
    const savedProfile = UTILS.storage.get('user_profile');
    if (savedProfile) {
        userProfile = { ...userProfile, ...savedProfile };
    }
    applyProfile();
}

// Save profile data
function saveProfile() {
    collectProfileData();
    UTILS.storage.set('user_profile', userProfile);
    showNotification('تم حفظ الملف الشخصي بنجاح!', 'success');
}

// Apply profile data to form
function applyProfile() {
    firstName.value = userProfile.firstName;
    lastName.value = userProfile.lastName;
    email.value = userProfile.email;
    phone.value = userProfile.phone;
    birthDate.value = userProfile.birthDate;
    gender.value = userProfile.gender;
    address.value = userProfile.address;
    jobTitle.value = userProfile.jobTitle;
    department.value = userProfile.department;
    hireDate.value = userProfile.hireDate;
    salary.value = userProfile.salary;
    manager.value = userProfile.manager;
    employmentStatus.value = userProfile.employmentStatus;
    
    // Update avatar
    if (userProfile.avatar) {
        profileAvatar.src = userProfile.avatar;
    }
    
    // Update display name
    updateDisplayName();
}

// Collect profile data from form
function collectProfileData() {
    userProfile.firstName = firstName.value;
    userProfile.lastName = lastName.value;
    userProfile.email = email.value;
    userProfile.phone = phone.value;
    userProfile.birthDate = birthDate.value;
    userProfile.gender = gender.value;
    userProfile.address = address.value;
    userProfile.jobTitle = jobTitle.value;
    userProfile.department = department.value;
    userProfile.hireDate = hireDate.value;
    userProfile.salary = salary.value;
    userProfile.manager = manager.value;
    userProfile.employmentStatus = employmentStatus.value;
}

// Update display name
function updateDisplayName() {
    const displayName = `${userProfile.firstName} ${userProfile.lastName}`;
    const nameElement = document.querySelector('h2');
    if (nameElement) {
        nameElement.textContent = displayName;
    }
    
    // Update avatar with new name
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&size=96&background=3b82f6&color=fff`;
    profileAvatar.src = avatarUrl;
    userProfile.avatar = avatarUrl;
}

// Handle avatar upload
function handleAvatarUpload(file) {
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileAvatar.src = e.target.result;
            userProfile.avatar = e.target.result;
            showNotification('تم تحديث الصورة الشخصية بنجاح!', 'success');
        };
        reader.readAsDataURL(file);
    }
}

// Validate form
function validateForm() {
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    
    if (!emailValue) {
        showNotification('يرجى إدخال البريد الإلكتروني', 'error');
        email.focus();
        return false;
    }
    
    if (!UTILS.validateEmail(emailValue)) {
        showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
        email.focus();
        return false;
    }
    
    if (phoneValue && !UTILS.validatePhone(phoneValue)) {
        showNotification('يرجى إدخال رقم هاتف صحيح', 'error');
        phone.focus();
        return false;
    }
    
    return true;
}

// Toggle edit mode
function toggleEditMode() {
    const inputs = document.querySelectorAll('input, select, textarea');
    const isReadOnly = inputs[0].readOnly;
    
    inputs.forEach(input => {
        input.readOnly = !isReadOnly;
        if (input.tagName === 'SELECT') {
            input.disabled = isReadOnly;
        }
    });
    
    if (isReadOnly) {
        editProfileBtn.innerHTML = '<i class="fas fa-times ml-2"></i>إلغاء';
        editProfileBtn.classList.remove('bg-gray-100', 'text-gray-700');
        editProfileBtn.classList.add('bg-red-100', 'text-red-700');
        saveProfileBtn.style.display = 'inline-flex';
    } else {
        editProfileBtn.innerHTML = '<i class="fas fa-edit ml-2"></i>تعديل';
        editProfileBtn.classList.remove('bg-red-100', 'text-red-700');
        editProfileBtn.classList.add('bg-gray-100', 'text-gray-700');
        saveProfileBtn.style.display = 'none';
        applyProfile(); // Reset form
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

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load profile data
    loadProfile();
    
    // Set form to read-only initially
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.readOnly = true;
        if (input.tagName === 'SELECT') {
            input.disabled = true;
        }
    });
    
    // Hide save button initially
    saveProfileBtn.style.display = 'none';
    
    // Edit profile button
    editProfileBtn.addEventListener('click', toggleEditMode);
    
    // Save profile button
    saveProfileBtn.addEventListener('click', function() {
        if (validateForm()) {
            saveProfile();
            toggleEditMode();
        }
    });
    
    // Avatar upload
    avatarInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                showNotification('يرجى اختيار ملف صورة صحيح', 'error');
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showNotification('حجم الصورة يجب أن يكون أقل من 5 ميجابايت', 'error');
                return;
            }
            
            handleAvatarUpload(file);
        }
    });
    
    // Auto-save on input change
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (!input.readOnly) {
                // Auto-save after a delay
                clearTimeout(window.autoSaveTimeout);
                window.autoSaveTimeout = setTimeout(() => {
                    collectProfileData();
                    showNotification('تم حفظ التغييرات تلقائياً', 'info');
                }, 2000);
            }
        });
    });
    
    // Real-time name update
    firstName.addEventListener('input', updateDisplayName);
    lastName.addEventListener('input', updateDisplayName);
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('مرحباً بك في صفحة الملف الشخصي!', 'info');
    }, 1000);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save profile
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (!document.querySelector('input').readOnly) {
            if (validateForm()) {
                saveProfile();
            }
        }
    }
    
    // Escape to cancel edit
    if (e.key === 'Escape') {
        const inputs = document.querySelectorAll('input, select, textarea');
        if (!inputs[0].readOnly) {
            toggleEditMode();
        }
    }
    
    // Enter to save when in edit mode
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        if (!e.target.readOnly) {
            if (validateForm()) {
                saveProfile();
                toggleEditMode();
            }
        }
    }
});

// Input validation on blur
email.addEventListener('blur', function() {
    const emailValue = this.value.trim();
    if (emailValue && !UTILS.validateEmail(emailValue)) {
        this.classList.add('border-red-500');
        showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
    } else {
        this.classList.remove('border-red-500');
    }
});

phone.addEventListener('blur', function() {
    const phoneValue = this.value.trim();
    if (phoneValue && !UTILS.validatePhone(phoneValue)) {
        this.classList.add('border-red-500');
        showNotification('يرجى إدخال رقم هاتف صحيح', 'error');
    } else {
        this.classList.remove('border-red-500');
    }
});

// Input validation on input
email.addEventListener('input', function() {
    this.classList.remove('border-red-500');
});

phone.addEventListener('input', function() {
    this.classList.remove('border-red-500');
});

// Export functions for global access
window.toggleEditMode = toggleEditMode;
window.saveProfile = saveProfile;
window.showNotification = showNotification; 