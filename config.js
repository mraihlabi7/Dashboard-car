// Configuration file for Auto Parts Management System

const CONFIG = {
    // Application Settings
    APP_NAME: "نظام إدارة قطع غيار السيارات",
    APP_VERSION: "1.0.0",
    APP_DESCRIPTION: "نظام متكامل لإدارة قطع غيار السيارات وبيعها أونلاين",
    
    // API Configuration (for future backend integration)
    API_BASE_URL: "http://localhost:3000/api",
    API_TIMEOUT: 30000,
    
    // Local Storage Keys
    STORAGE_KEYS: {
        USER_TOKEN: "auto_parts_token",
        USER_DATA: "auto_parts_user",
        CART_ITEMS: "auto_parts_cart",
        THEME: "auto_parts_theme",
        LANGUAGE: "auto_parts_language"
    },
    
    // Pagination Settings
    PAGINATION: {
        DEFAULT_PAGE_SIZE: 10,
        PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100]
    },
    
    // Currency Settings
    CURRENCY: {
        CODE: "SAR",
        SYMBOL: "ر.س",
        DECIMAL_PLACES: 2
    },
    
    // Date Format
    DATE_FORMAT: "DD/MM/YYYY",
    DATE_TIME_FORMAT: "DD/MM/YYYY HH:mm",
    
    // Car Types
    CAR_TYPES: {
        toyota: "تويوتا",
        honda: "هوندا",
        nissan: "نيسان",
        bmw: "بي إم دبليو",
        mercedes: "مرسيدس",
        audi: "أودي",
        volkswagen: "فولكس فاجن",
        hyundai: "هيونداي",
        kia: "كيا",
        ford: "فورد",
        chevrolet: "شيفروليه",
        mazda: "مازدا",
        mitsubishi: "ميتسوبيشي",
        lexus: "لكزس",
        infiniti: "إنفينيتي",
        acura: "أكورا",
        volvo: "فولفو",
        jaguar: "جاجوار",
        land_rover: "لاند روفر",
        porsche: "بورش",
        ferrari: "فيراري",
        lamborghini: "لامبورغيني",
        maserati: "مازيراتي",
        bentley: "بنتلي",
        rolls_royce: "رولز رويس",
        aston_martin: "أستون مارتن",
        mclaren: "ماكلارين",
        bugatti: "بوجاتي",
        pagani: "باجاني",
        koenigsegg: "كويجسيج"
    },
    
    // Part Types
    PART_TYPES: {
        engine: "محرك",
        brakes: "فرامل",
        electrical: "كهرباء",
        filters: "فلاتر",
        transmission: "ناقل حركة",
        suspension: "تعليق",
        steering: "توجيه",
        cooling: "تبريد",
        fuel: "وقود",
        exhaust: "عادم",
        body: "هيكل",
        interior: "داخلي",
        exterior: "خارجي",
        audio: "صوتيات",
        security: "أمان",
        lighting: "إضاءة",
        tires: "إطارات",
        wheels: "عجلات",
        tools: "أدوات",
        accessories: "ملحقات"
    },
    
    // Order Status
    ORDER_STATUS: {
        pending: {
            label: "معلق",
            color: "yellow",
            icon: "fas fa-clock"
        },
        processing: {
            label: "قيد المعالجة",
            color: "blue",
            icon: "fas fa-cog"
        },
        shipped: {
            label: "قيد الشحن",
            color: "purple",
            icon: "fas fa-truck"
        },
        delivered: {
            label: "تم التوصيل",
            color: "green",
            icon: "fas fa-check-circle"
        },
        cancelled: {
            label: "ملغي",
            color: "red",
            icon: "fas fa-times-circle"
        },
        returned: {
            label: "مرتجع",
            color: "orange",
            icon: "fas fa-undo"
        }
    },
    
    // Stock Status
    STOCK_STATUS: {
        "in-stock": {
            label: "متوفر",
            color: "green",
            threshold: 10
        },
        "low-stock": {
            label: "مخزون منخفض",
            color: "yellow",
            threshold: 5
        },
        "out-of-stock": {
            label: "نفذ المخزون",
            color: "red",
            threshold: 0
        }
    },
    
    // User Roles
    USER_ROLES: {
        super_admin: {
            label: "مدير النظام",
            permissions: ["all"]
        },
        admin: {
            label: "مدير",
            permissions: ["manage_products", "manage_orders", "manage_customers", "view_reports"]
        },
        manager: {
            label: "مدير محل",
            permissions: ["manage_products", "manage_orders", "view_reports"]
        },
        employee: {
            label: "موظف",
            permissions: ["view_products", "create_orders", "view_reports"]
        },
        supplier: {
            label: "مورد",
            permissions: ["manage_own_products", "view_orders"]
        },
        customer: {
            label: "عميل",
            permissions: ["view_products", "create_orders", "view_own_orders"]
        }
    },
    
    // Notification Settings
    NOTIFICATIONS: {
        AUTO_HIDE_DURATION: 5000,
        POSITION: "top-left",
        TYPES: {
            success: { icon: "fas fa-check-circle", color: "green" },
            error: { icon: "fas fa-exclamation-circle", color: "red" },
            warning: { icon: "fas fa-exclamation-triangle", color: "yellow" },
            info: { icon: "fas fa-info-circle", color: "blue" }
        }
    },
    
    // Theme Settings
    THEMES: {
        light: {
            name: "فاتح",
            primary: "#3b82f6",
            secondary: "#64748b",
            background: "#f8fafc",
            surface: "#ffffff",
            text: "#1e293b"
        },
        dark: {
            name: "داكن",
            primary: "#60a5fa",
            secondary: "#94a3b8",
            background: "#0f172a",
            surface: "#1e293b",
            text: "#f1f5f9"
        }
    },
    
    // Language Settings
    LANGUAGES: {
        ar: {
            name: "العربية",
            direction: "rtl",
            flag: "🇸🇦"
        },
        en: {
            name: "English",
            direction: "ltr",
            flag: "🇺🇸"
        }
    },
    
    // File Upload Settings
    UPLOAD: {
        MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
        ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp"],
        MAX_FILES: 10
    },
    
    // Search Settings
    SEARCH: {
        MIN_CHARS: 2,
        DEBOUNCE_DELAY: 300,
        MAX_RESULTS: 50
    },
    
    // Export Settings
    EXPORT: {
        FORMATS: ["csv", "excel", "pdf"],
        DEFAULT_FORMAT: "csv"
    },
    
    // Security Settings
    SECURITY: {
        SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
        MAX_LOGIN_ATTEMPTS: 5,
        LOCKOUT_DURATION: 15 * 60 * 1000 // 15 minutes
    }
};

// Utility Functions
const UTILS = {
    // Format currency
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('ar-SA', {
            style: 'currency',
            currency: CONFIG.CURRENCY.CODE
        }).format(amount);
    },
    
    // Format date
    formatDate: (date) => {
        return new Intl.DateTimeFormat('ar-SA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(new Date(date));
    },
    
    // Format date and time
    formatDateTime: (date) => {
        return new Intl.DateTimeFormat('ar-SA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    },
    
    // Get car type name
    getCarTypeName: (key) => {
        return CONFIG.CAR_TYPES[key] || key;
    },
    
    // Get part type name
    getPartTypeName: (key) => {
        return CONFIG.PART_TYPES[key] || key;
    },
    
    // Get order status info
    getOrderStatusInfo: (status) => {
        return CONFIG.ORDER_STATUS[status] || CONFIG.ORDER_STATUS.pending;
    },
    
    // Get stock status
    getStockStatus: (quantity) => {
        if (quantity === 0) return "out-of-stock";
        if (quantity <= CONFIG.STOCK_STATUS["low-stock"].threshold) return "low-stock";
        return "in-stock";
    },
    
    // Validate email
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Validate phone number (Saudi format)
    validatePhone: (phone) => {
        const re = /^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
        return re.test(phone);
    },
    
    // Generate random ID
    generateId: (prefix = '') => {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substr(2, 5);
        return `${prefix}${timestamp}${randomStr}`.toUpperCase();
    },
    
    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Local storage helpers
    storage: {
        get: (key) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                return null;
            }
        },
        
        set: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('Error writing to localStorage:', error);
                return false;
            }
        },
        
        remove: (key) => {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.error('Error removing from localStorage:', error);
                return false;
            }
        },
        
        clear: () => {
            try {
                localStorage.clear();
                return true;
            } catch (error) {
                console.error('Error clearing localStorage:', error);
                return false;
            }
        }
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, UTILS };
} else {
    window.CONFIG = CONFIG;
    window.UTILS = UTILS;
} 