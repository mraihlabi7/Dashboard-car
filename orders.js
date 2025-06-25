// Sample Orders Data
let orders = [
    {
        id: "ORD-001",
        customer: {
            name: "أحمد علي محمد",
            email: "ahmed@example.com",
            phone: "0501234567"
        },
        products: [
            { name: "فلتر زيت محرك", quantity: 2, price: 45.00 },
            { name: "فرامل أمامية", quantity: 1, price: 120.00 }
        ],
        total: 210.00,
        status: "delivered",
        orderDate: "2024-01-15",
        deliveryDate: "2024-01-18",
        shippingAddress: "شارع الملك فهد، الرياض، المملكة العربية السعودية",
        paymentMethod: "بطاقة ائتمان"
    },
    {
        id: "ORD-002",
        customer: {
            name: "فاطمة محمد أحمد",
            email: "fatima@example.com",
            phone: "0509876543"
        },
        products: [
            { name: "بطارية سيارة", quantity: 1, price: 280.00 }
        ],
        total: 280.00,
        status: "processing",
        orderDate: "2024-01-16",
        deliveryDate: null,
        shippingAddress: "شارع التحلية، جدة، المملكة العربية السعودية",
        paymentMethod: "الدفع عند الاستلام"
    },
    {
        id: "ORD-003",
        customer: {
            name: "محمد حسن علي",
            email: "mohammed@example.com",
            phone: "0505555555"
        },
        products: [
            { name: "شمعات إشعال", quantity: 4, price: 85.00 },
            { name: "فلتر هواء", quantity: 1, price: 35.00 },
            { name: "زيت محرك", quantity: 2, price: 65.00 }
        ],
        total: 445.00,
        status: "shipped",
        orderDate: "2024-01-17",
        deliveryDate: null,
        shippingAddress: "شارع العليا، الدمام، المملكة العربية السعودية",
        paymentMethod: "بطاقة ائتمان"
    },
    {
        id: "ORD-004",
        customer: {
            name: "علي أحمد محمد",
            email: "ali@example.com",
            phone: "0501111111"
        },
        products: [
            { name: "مضخة مياه", quantity: 1, price: 95.00 }
        ],
        total: 95.00,
        status: "pending",
        orderDate: "2024-01-18",
        deliveryDate: null,
        shippingAddress: "شارع الملك عبدالله، المدينة المنورة، المملكة العربية السعودية",
        paymentMethod: "الدفع عند الاستلام"
    },
    {
        id: "ORD-005",
        customer: {
            name: "سارة محمد علي",
            email: "sara@example.com",
            phone: "0502222222"
        },
        products: [
            { name: "كابل بطارية", quantity: 2, price: 25.00 },
            { name: "فلتر زيت محرك", quantity: 1, price: 45.00 }
        ],
        total: 95.00,
        status: "cancelled",
        orderDate: "2024-01-19",
        deliveryDate: null,
        shippingAddress: "شارع الملك خالد، أبها، المملكة العربية السعودية",
        paymentMethod: "بطاقة ائتمان"
    }
];

// DOM Elements
const ordersTableBody = document.getElementById('ordersTableBody');
const orderDetailsModal = document.getElementById('orderDetailsModal');
const closeOrderModal = document.getElementById('closeOrderModal');
const orderDetailsContent = document.getElementById('orderDetailsContent');
const exportBtn = document.getElementById('exportBtn');

// Filter Elements
const orderNumberFilter = document.getElementById('orderNumberFilter');
const customerFilter = document.getElementById('customerFilter');
const statusFilter = document.getElementById('statusFilter');
const dateFromFilter = document.getElementById('dateFromFilter');
const dateToFilter = document.getElementById('dateToFilter');

// Pagination Elements
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const startRange = document.getElementById('startRange');
const endRange = document.getElementById('endRange');
const totalOrders = document.getElementById('totalOrders');

// Pagination Variables
let currentPage = 1;
const itemsPerPage = 10;
let filteredOrders = [...orders];

// Status Configuration
const statusConfig = {
    pending: { 
        class: 'bg-yellow-100 text-yellow-800', 
        text: 'معلق',
        icon: 'fas fa-clock'
    },
    processing: { 
        class: 'bg-blue-100 text-blue-800', 
        text: 'قيد المعالجة',
        icon: 'fas fa-cog'
    },
    shipped: { 
        class: 'bg-purple-100 text-purple-800', 
        text: 'قيد الشحن',
        icon: 'fas fa-truck'
    },
    delivered: { 
        class: 'bg-green-100 text-green-800', 
        text: 'تم التوصيل',
        icon: 'fas fa-check-circle'
    },
    cancelled: { 
        class: 'bg-red-100 text-red-800', 
        text: 'ملغي',
        icon: 'fas fa-times-circle'
    }
};

// Generate Order Row HTML
function createOrderRow(order) {
    const status = statusConfig[order.status];
    const orderDate = new Date(order.orderDate).toLocaleDateString('ar-SA');
    
    return `
        <tr class="order-card hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${order.id}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${order.customer.name}</div>
                <div class="text-sm text-gray-500">${order.customer.email}</div>
            </td>
            <td class="px-6 py-4">
                <div class="text-sm text-gray-900">${order.products.length} منتج</div>
                <div class="text-sm text-gray-500">${order.products.map(p => p.name).join(', ')}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${order.total} ر.س</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${orderDate}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.class}">
                    <i class="${status.icon} ml-1"></i>
                    ${status.text}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2 space-x-reverse">
                    <button onclick="viewOrderDetails('${order.id}')" class="text-blue-600 hover:text-blue-900">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="updateOrderStatus('${order.id}')" class="text-green-600 hover:text-green-900">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteOrder('${order.id}')" class="text-red-600 hover:text-red-900">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

// Render Orders Table
function renderOrders() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageOrders = filteredOrders.slice(startIndex, endIndex);
    
    ordersTableBody.innerHTML = pageOrders.map(order => createOrderRow(order)).join('');
    
    // Update pagination info
    startRange.textContent = startIndex + 1;
    endRange.textContent = Math.min(endIndex, filteredOrders.length);
    totalOrders.textContent = filteredOrders.length;
    
    // Update pagination buttons
    prevPage.disabled = currentPage === 1;
    nextPage.disabled = endIndex >= filteredOrders.length;
}

// Filter Orders
function filterOrders() {
    const orderNumber = orderNumberFilter.value.toLowerCase();
    const customer = customerFilter.value.toLowerCase();
    const status = statusFilter.value;
    const dateFrom = dateFromFilter.value;
    const dateTo = dateToFilter.value;
    
    filteredOrders = orders.filter(order => {
        const matchesOrderNumber = order.id.toLowerCase().includes(orderNumber);
        const matchesCustomer = order.customer.name.toLowerCase().includes(customer) || 
                              order.customer.email.toLowerCase().includes(customer);
        const matchesStatus = !status || order.status === status;
        const matchesDateFrom = !dateFrom || order.orderDate >= dateFrom;
        const matchesDateTo = !dateTo || order.orderDate <= dateTo;
        
        return matchesOrderNumber && matchesCustomer && matchesStatus && matchesDateFrom && matchesDateTo;
    });
    
    currentPage = 1;
    renderOrders();
}

// View Order Details
function viewOrderDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const status = statusConfig[order.status];
    const orderDate = new Date(order.orderDate).toLocaleDateString('ar-SA');
    const deliveryDate = order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString('ar-SA') : 'لم يتم التوصيل بعد';
    
    orderDetailsContent.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
                <h4 class="text-lg font-semibold text-gray-800 mb-4">معلومات الطلب</h4>
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="text-gray-600">رقم الطلب:</span>
                        <span class="font-medium">${order.id}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">تاريخ الطلب:</span>
                        <span class="font-medium">${orderDate}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">تاريخ التوصيل:</span>
                        <span class="font-medium">${deliveryDate}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">طريقة الدفع:</span>
                        <span class="font-medium">${order.paymentMethod}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">الحالة:</span>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.class}">
                            <i class="${status.icon} ml-1"></i>
                            ${status.text}
                        </span>
                    </div>
                </div>
            </div>
            
            <div>
                <h4 class="text-lg font-semibold text-gray-800 mb-4">معلومات العميل</h4>
                <div class="space-y-3">
                    <div class="flex justify-between">
                        <span class="text-gray-600">الاسم:</span>
                        <span class="font-medium">${order.customer.name}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">البريد الإلكتروني:</span>
                        <span class="font-medium">${order.customer.email}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">رقم الهاتف:</span>
                        <span class="font-medium">${order.customer.phone}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="mt-6">
            <h4 class="text-lg font-semibold text-gray-800 mb-4">عنوان التوصيل</h4>
            <p class="text-gray-700">${order.shippingAddress}</p>
        </div>
        
        <div class="mt-6">
            <h4 class="text-lg font-semibold text-gray-800 mb-4">المنتجات</h4>
            <div class="bg-gray-50 rounded-lg p-4">
                ${order.products.map(product => `
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <div>
                            <span class="font-medium">${product.name}</span>
                            <span class="text-gray-500 text-sm mr-2">× ${product.quantity}</span>
                        </div>
                        <span class="font-medium">${product.price * product.quantity} ر.س</span>
                    </div>
                `).join('')}
                <div class="flex justify-between items-center py-2 mt-2 border-t border-gray-300">
                    <span class="font-bold text-lg">الإجمالي:</span>
                    <span class="font-bold text-lg text-blue-600">${order.total} ر.س</span>
                </div>
            </div>
        </div>
        
        <div class="mt-6 flex space-x-4 space-x-reverse">
            <button onclick="updateOrderStatus('${order.id}')" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <i class="fas fa-edit ml-2"></i>
                تحديث الحالة
            </button>
            <button onclick="printOrder('${order.id}')" class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                <i class="fas fa-print ml-2"></i>
                طباعة
            </button>
        </div>
    `;
    
    orderDetailsModal.classList.remove('hidden');
}

// Update Order Status
function updateOrderStatus(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const statuses = Object.keys(statusConfig);
    const currentStatusIndex = statuses.indexOf(order.status);
    const nextStatusIndex = (currentStatusIndex + 1) % statuses.length;
    const newStatus = statuses[nextStatusIndex];
    
    order.status = newStatus;
    
    if (newStatus === 'delivered' && !order.deliveryDate) {
        order.deliveryDate = new Date().toISOString().split('T')[0];
    }
    
    renderOrders();
    showNotification(`تم تحديث حالة الطلب ${orderId} إلى ${statusConfig[newStatus].text}`, 'success');
}

// Delete Order
function deleteOrder(orderId) {
    if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
        orders = orders.filter(o => o.id !== orderId);
        filterOrders();
        showNotification('تم حذف الطلب بنجاح!', 'success');
    }
}

// Print Order
function printOrder(orderId) {
    showNotification('جاري إعداد الطباعة...', 'info');
    // Here you would implement actual printing logic
    setTimeout(() => {
        showNotification('تم إرسال الطلب للطباعة!', 'success');
    }, 1000);
}

// Export Data
function exportData() {
    showNotification('جاري تصدير البيانات...', 'info');
    
    // Create CSV content
    const headers = ['رقم الطلب', 'العميل', 'البريد الإلكتروني', 'الهاتف', 'المنتجات', 'المبلغ', 'التاريخ', 'الحالة'];
    const csvContent = [
        headers.join(','),
        ...filteredOrders.map(order => [
            order.id,
            order.customer.name,
            order.customer.email,
            order.customer.phone,
            order.products.map(p => p.name).join(';'),
            order.total,
            order.orderDate,
            statusConfig[order.status].text
        ].join(','))
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `orders_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('تم تصدير البيانات بنجاح!', 'success');
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

// Event Listeners
closeOrderModal.addEventListener('click', () => {
    orderDetailsModal.classList.add('hidden');
});

orderDetailsModal.addEventListener('click', (e) => {
    if (e.target === orderDetailsModal) {
        orderDetailsModal.classList.add('hidden');
    }
});

exportBtn.addEventListener('click', exportData);

// Filter Event Listeners
orderNumberFilter.addEventListener('input', filterOrders);
customerFilter.addEventListener('input', filterOrders);
statusFilter.addEventListener('change', filterOrders);
dateFromFilter.addEventListener('change', filterOrders);
dateToFilter.addEventListener('change', filterOrders);

// Pagination Event Listeners
prevPage.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderOrders();
    }
});

nextPage.addEventListener('click', () => {
    const maxPage = Math.ceil(filteredOrders.length / itemsPerPage);
    if (currentPage < maxPage) {
        currentPage++;
        renderOrders();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderOrders();
    showNotification('مرحباً بك في صفحة إدارة الطلبات!', 'info');
});

// Export functions for global access
window.viewOrderDetails = viewOrderDetails;
window.updateOrderStatus = updateOrderStatus;
window.deleteOrder = deleteOrder;
window.printOrder = printOrder;
window.showNotification = showNotification; 