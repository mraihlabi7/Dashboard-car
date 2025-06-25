// Sample Products Data
let products = [
    {
        id: 1,
        name: "فلتر زيت محرك",
        code: "FLT-001",
        carType: "toyota",
        partType: "filters",
        price: 45.00,
        stock: 150,
        description: "فلتر زيت محرك عالي الجودة لتويوتا كامري",
        image: "https://ui-avatars.com/api/?name=فلتر+.&size=96&background=7d7585&color=fff",
        status: "in-stock"
    },
    {
        id: 2,
        name: "فرامل أمامية",
        code: "BRK-002",
        carType: "honda",
        partType: "brakes",
        price: 120.00,
        stock: 8,
        description: "فرامل أمامية لهوندا سيفيك",
        image: "https://ui-avatars.com/api/?name=فرامل+.&size=96&background=7d7585&color=fff",
        status: "low-stock"
    },
    {
        id: 3,
        name: "بطارية سيارة",
        code: "BAT-003",
        carType: "nissan",
        partType: "electrical",
        price: 280.00,
        stock: 0,
        description: "بطارية سيارة 60 أمبير لنيسان سنترا",
        image: "https://ui-avatars.com/api/?name=بطارية+.&size=96&background=7d7585&color=fff",
        status: "out-of-stock"
    },
    {
        id: 4,
        name: "شمعات إشعال",
        code: "SPK-004",
        carType: "bmw",
        partType: "engine",
        price: 85.00,
        stock: 25,
        description: "شمعات إشعال لبي إم دبليو",
        image: "https://ui-avatars.com/api/?name=شمعات+.&size=96&background=7d7585&color=fff",
        status: "in-stock"
    },
    {
        id: 5,
        name: "فلتر هواء",
        code: "AIR-005",
        carType: "toyota",
        partType: "filters",
        price: 35.00,
        stock: 5,
        description: "فلتر هواء محرك لتويوتا",
        image: "https://ui-avatars.com/api/?name=فلتر+.&size=96&background=7d7585&color=fff",
        status: "low-stock"
    },
    {
        id: 6,
        name: "زيت محرك",
        code: "OIL-006",
        carType: "honda",
        partType: "engine",
        price: 65.00,
        stock: 12,
        description: "زيت محرك 5W-30 لهوندا",
        image: "https://ui-avatars.com/api/?name=زيت+.&size=96&background=7d7585&color=fff",
        status: "low-stock"
    }
];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const productsTable = document.getElementById('productsTable');
const productsTableBody = document.getElementById('productsTableBody');
const gridViewBtn = document.getElementById('gridViewBtn');
const tableViewBtn = document.getElementById('tableViewBtn');
const addProductBtn = document.getElementById('addProductBtn');
const addProductModal = document.getElementById('addProductModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const addProductForm = document.getElementById('addProductForm');
const searchInput = document.getElementById('searchInput');
const carTypeFilter = document.getElementById('carTypeFilter');
const partTypeFilter = document.getElementById('partTypeFilter');
const stockFilter = document.getElementById('stockFilter');
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Modal Functions
function openModal() {
    addProductModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    addProductModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    addProductForm.reset();
}

// Event Listeners
addProductBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeModalFunc);
cancelBtn.addEventListener('click', closeModalFunc);

// View toggle event listeners
gridViewBtn.addEventListener('click', switchToGridView);
tableViewBtn.addEventListener('click', switchToTableView);

// Close modal when clicking outside
addProductModal.addEventListener('click', function(e) {
    if (e.target === addProductModal) {
        closeModalFunc();
    }
});

// Generate Product Card HTML
function createProductCard(product) {
    const stockStatus = {
        'in-stock': { class: 'bg-green-100 text-green-800', text: 'متوفر' },
        'low-stock': { class: 'bg-yellow-100 text-yellow-800', text: 'مخزون منخفض' },
        'out-of-stock': { class: 'bg-red-100 text-red-800', text: 'نفذ المخزون' }
    };

    const carTypeNames = {
        'toyota': 'تويوتا',
        'honda': 'هوندا',
        'nissan': 'نيسان',
        'bmw': 'بي إم دبليو'
    };

    const partTypeNames = {
        'engine': 'محرك',
        'brakes': 'فرامل',
        'electrical': 'كهرباء',
        'filters': 'فلاتر'
    };

    return `
        <div class="bg-white rounded-xl shadow-sm overflow-hidden product-card">
            <div class="relative">
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="absolute top-2 right-2">
                    <span class="inline-block px-2 py-1 text-xs rounded-full ${stockStatus[product.status].class}">
                        ${stockStatus[product.status].text}
                    </span>
                </div>
                <div class="absolute top-2 left-2 space-x-2 space-x-reverse">
                    <button onclick="editProduct(${product.id})" class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                        <i class="fas fa-edit text-sm"></i>
                    </button>
                    <button onclick="deleteProduct(${product.id})" class="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                        <i class="fas fa-trash text-sm"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-4">
                <h3 class="font-semibold text-gray-800 mb-2">${product.name}</h3>
                <p class="text-sm text-gray-600 mb-2">${product.description}</p>
                
                <div class="space-y-2 mb-4">
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">الكود:</span>
                        <span class="font-medium">${product.code}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">السيارة:</span>
                        <span class="font-medium">${carTypeNames[product.carType]}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">النوع:</span>
                        <span class="font-medium">${partTypeNames[product.partType]}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-gray-500">المخزون:</span>
                        <span class="font-medium">${product.stock} وحدة</span>
                    </div>
                </div>
                
                <div class="flex items-center justify-between">
                    <span class="text-xl font-bold text-blue-600">${product.price} ر.س</span>
                    <button onclick="addToCart(${product.id})" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        <i class="fas fa-cart-plus ml-1"></i>
                        إضافة
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Generate Product Table Row HTML
function createProductTableRow(product) {
    const stockStatus = {
        'in-stock': { class: 'bg-green-100 text-green-800', text: 'متوفر' },
        'low-stock': { class: 'bg-yellow-100 text-yellow-800', text: 'مخزون منخفض' },
        'out-of-stock': { class: 'bg-red-100 text-red-800', text: 'نفذ المخزون' }
    };

    const carTypeNames = {
        'toyota': 'تويوتا',
        'honda': 'هوندا',
        'nissan': 'نيسان',
        'bmw': 'بي إم دبليو'
    };

    const partTypeNames = {
        'engine': 'محرك',
        'brakes': 'فرامل',
        'electrical': 'كهرباء',
        'filters': 'فلاتر'
    };

    return `
        <tr class="table-row">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-lg" src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="mr-4">
                        <div class="text-sm font-medium text-gray-900">${product.name}</div>
                        <div class="text-sm text-gray-500">${product.description}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.code}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${carTypeNames[product.carType]}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${partTypeNames[product.partType]}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">${product.price} ر.س</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.stock} وحدة</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockStatus[product.status].class}">
                    ${stockStatus[product.status].text}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-2 space-x-reverse">
                    <button onclick="editProduct(${product.id})" class="text-blue-600 hover:text-blue-900">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteProduct(${product.id})" class="text-red-600 hover:text-red-900">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button onclick="addToCart(${product.id})" class="text-green-600 hover:text-green-900">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

// View Toggle Functions
function switchToGridView() {
    productsGrid.classList.remove('hidden');
    productsTable.classList.add('hidden');
    gridViewBtn.classList.add('active');
    tableViewBtn.classList.remove('active');
    localStorage.setItem('productsView', 'grid');
    renderProducts(); // Re-render products in grid view
}

function switchToTableView() {
    productsGrid.classList.add('hidden');
    productsTable.classList.remove('hidden');
    tableViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
    localStorage.setItem('productsView', 'table');
    renderProducts(); // Re-render products in table view
}

// Render Products
function renderProducts(productsToRender = products) {
    const currentView = localStorage.getItem('productsView') || 'grid';
    
    if (currentView === 'grid') {
        productsGrid.innerHTML = productsToRender.map(product => createProductCard(product)).join('');
    } else {
        productsTableBody.innerHTML = productsToRender.map(product => createProductTableRow(product)).join('');
    }
}

// Filter Products
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCarType = carTypeFilter.value;
    const selectedPartType = partTypeFilter.value;
    const selectedStockStatus = stockFilter.value;

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.code.toLowerCase().includes(searchTerm);
        const matchesCarType = !selectedCarType || product.carType === selectedCarType;
        const matchesPartType = !selectedPartType || product.partType === selectedPartType;
        const matchesStockStatus = !selectedStockStatus || product.status === selectedStockStatus;

        return matchesSearch && matchesCarType && matchesPartType && matchesStockStatus;
    });

    renderProducts(filteredProducts);
}

// Add Product Form Handler
addProductForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(addProductForm);
    const newProduct = {
        id: products.length + 1,
        name: formData.get('name'),
        code: formData.get('code'),
        carType: formData.get('carType'),
        partType: formData.get('partType'),
        price: parseFloat(formData.get('price')),
        stock: parseInt(formData.get('stock')),
        description: formData.get('description'),
        image: "https://via.placeholder.com/300x200?text=" + encodeURIComponent(formData.get('name')),
        status: parseInt(formData.get('stock')) === 0 ? 'out-of-stock' : 
                parseInt(formData.get('stock')) <= 10 ? 'low-stock' : 'in-stock'
    };

    products.unshift(newProduct);
    renderProducts();
    closeModalFunc();
    
    // Show success notification
    showNotification('تم إضافة المنتج بنجاح!', 'success');
});

// Edit Product
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // Populate form with product data
        addProductForm.querySelector('[name="name"]').value = product.name;
        addProductForm.querySelector('[name="code"]').value = product.code;
        addProductForm.querySelector('[name="carType"]').value = product.carType;
        addProductForm.querySelector('[name="partType"]').value = product.partType;
        addProductForm.querySelector('[name="price"]').value = product.price;
        addProductForm.querySelector('[name="stock"]').value = product.stock;
        addProductForm.querySelector('[name="description"]').value = product.description;
        
        openModal();
        showNotification('يمكنك تعديل بيانات المنتج', 'info');
    }
}

// Delete Product
function deleteProduct(productId) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        products = products.filter(p => p.id !== productId);
        renderProducts();
        showNotification('تم حذف المنتج بنجاح!', 'success');
    }
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        if (product.stock > 0) {
            showNotification(`تم إضافة ${product.name} إلى السلة`, 'success');
            // Here you would typically add to cart logic
        } else {
            showNotification('عذراً، هذا المنتج غير متوفر في المخزون', 'error');
        }
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 left-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
    
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
    
    document.body.appendChild(notification);
    
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

// Event Listeners for Filters
searchInput.addEventListener('input', filterProducts);
carTypeFilter.addEventListener('change', filterProducts);
partTypeFilter.addEventListener('change', filterProducts);
stockFilter.addEventListener('change', filterProducts);

// Load More Functionality
let currentPage = 1;
const itemsPerPage = 8;

loadMoreBtn.addEventListener('click', function() {
    currentPage++;
    // Simulate loading more products
    showNotification('جاري تحميل المزيد من المنتجات...', 'info');
    
    setTimeout(() => {
        // Add more sample products
        const newProducts = [
            {
                id: products.length + 1,
                name: "مضخة مياه",
                code: "WTR-007",
                carType: "toyota",
                partType: "engine",
                price: 95.00,
                stock: 18,
                description: "مضخة مياه محرك لتويوتا",
                image: "https://via.placeholder.com/300x200?text=مضخة+مياه",
                status: "in-stock"
            },
            {
                id: products.length + 2,
                name: "كابل بطارية",
                code: "CBL-008",
                carType: "honda",
                partType: "electrical",
                price: 25.00,
                stock: 45,
                description: "كابل بطارية لهوندا",
                image: "https://via.placeholder.com/300x200?text=كابل+بطارية",
                status: "in-stock"
            }
        ];
        
        products.push(...newProducts);
        renderProducts();
        showNotification('تم تحميل منتجات جديدة!', 'success');
    }, 1000);
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Initialize view based on localStorage
    const savedView = localStorage.getItem('productsView') || 'grid';
    if (savedView === 'table') {
        switchToTableView();
    } else {
        switchToGridView();
    }
    
    renderProducts();
    showNotification('مرحباً بك في صفحة إدارة المنتجات!', 'info');
});

// Export functions for global access
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.addToCart = addToCart;
window.showNotification = showNotification; 