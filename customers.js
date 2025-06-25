// Customers Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample customers data
    const customers = [
        {
            id: 1,
            name: 'أحمد علي محمد',
            email: 'ahmed.ali@email.com',
            phone: '+966501234567',
            orders: 15,
            totalSpent: 4500,
            status: 'active',
            joinDate: '2023-01-15'
        },
        {
            id: 2,
            name: 'فاطمة أحمد حسن',
            email: 'fatima.ahmed@email.com',
            phone: '+966502345678',
            orders: 8,
            totalSpent: 2300,
            status: 'active',
            joinDate: '2023-03-20'
        },
        {
            id: 3,
            name: 'محمد سعيد عبدالله',
            email: 'mohammed.saeed@email.com',
            phone: '+966503456789',
            orders: 23,
            totalSpent: 7800,
            status: 'vip',
            joinDate: '2022-11-10'
        },
        {
            id: 4,
            name: 'سارة خالد محمد',
            email: 'sara.khalid@email.com',
            phone: '+966504567890',
            orders: 5,
            totalSpent: 1200,
            status: 'inactive',
            joinDate: '2023-06-05'
        },
        {
            id: 5,
            name: 'علي حسن أحمد',
            email: 'ali.hassan@email.com',
            phone: '+966505678901',
            orders: 12,
            totalSpent: 3400,
            status: 'active',
            joinDate: '2023-02-28'
        }
    ];

    let currentPage = 1;
    const itemsPerPage = 10;
    let filteredCustomers = [...customers];

    // Initialize the page
    function init() {
        renderCustomers();
        setupEventListeners();
        updateStats();
    }

    // Render customers table
    function renderCustomers() {
        const tbody = document.getElementById('customersTableBody');
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageCustomers = filteredCustomers.slice(startIndex, endIndex);

        tbody.innerHTML = '';

        pageCustomers.forEach(customer => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-gray-50';
            
            const statusClass = customer.status === 'active' ? 'bg-green-100 text-green-800' :
                              customer.status === 'vip' ? 'bg-purple-100 text-purple-800' :
                              'bg-red-100 text-red-800';
            
            const statusText = customer.status === 'active' ? 'نشط' :
                             customer.status === 'vip' ? 'VIP' : 'غير نشط';

            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span class="text-sm font-medium text-gray-700">${customer.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div class="mr-4">
                            <div class="text-sm font-medium text-gray-900">${customer.name}</div>
                            <div class="text-sm text-gray-500">انضم في ${new Date(customer.joinDate).toLocaleDateString('ar-SA')}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${customer.email}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${customer.phone}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${customer.orders}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${customer.totalSpent.toLocaleString()} ر.س</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusClass}">
                        ${statusText}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onclick="viewCustomer(${customer.id})" class="text-blue-600 hover:text-blue-900 ml-3">عرض</button>
                    <button onclick="editCustomer(${customer.id})" class="text-green-600 hover:text-green-900 ml-3">تعديل</button>
                    <button onclick="deleteCustomer(${customer.id})" class="text-red-600 hover:text-red-900">حذف</button>
                </td>
            `;
            
            tbody.appendChild(row);
        });

        updatePagination();
    }

    // Update pagination
    function updatePagination() {
        const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
        const startRange = (currentPage - 1) * itemsPerPage + 1;
        const endRange = Math.min(currentPage * itemsPerPage, filteredCustomers.length);

        document.getElementById('startRange').textContent = startRange;
        document.getElementById('endRange').textContent = endRange;
        document.getElementById('totalCustomers').textContent = filteredCustomers.length;

        document.getElementById('prevPage').disabled = currentPage === 1;
        document.getElementById('nextPage').disabled = currentPage === totalPages;
    }

    // Update stats
    function updateStats() {
        const totalCustomers = customers.length;
        const activeCustomers = customers.filter(c => c.status === 'active').length;
        const vipCustomers = customers.filter(c => c.status === 'vip').length;
        const avgOrders = (customers.reduce((sum, c) => sum + c.orders, 0) / totalCustomers).toFixed(1);

        // Update stats cards (these would be updated if the stats cards had IDs)
        console.log('Stats updated:', { totalCustomers, activeCustomers, vipCustomers, avgOrders });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filteredCustomers = customers.filter(customer => 
                customer.name.toLowerCase().includes(searchTerm) ||
                customer.email.toLowerCase().includes(searchTerm)
            );
            currentPage = 1;
            renderCustomers();
        });

        // Status filter
        const statusFilter = document.getElementById('statusFilter');
        statusFilter.addEventListener('change', function() {
            const status = this.value;
            filteredCustomers = status ? customers.filter(c => c.status === status) : customers;
            currentPage = 1;
            renderCustomers();
        });

        // Date filters
        const dateFromFilter = document.getElementById('dateFromFilter');
        const dateToFilter = document.getElementById('dateToFilter');

        [dateFromFilter, dateToFilter].forEach(filter => {
            filter.addEventListener('change', function() {
                const fromDate = dateFromFilter.value;
                const toDate = dateToFilter.value;
                
                filteredCustomers = customers.filter(customer => {
                    const joinDate = customer.joinDate;
                    if (fromDate && joinDate < fromDate) return false;
                    if (toDate && joinDate > toDate) return false;
                    return true;
                });
                
                currentPage = 1;
                renderCustomers();
            });
        });

        // Pagination
        document.getElementById('prevPage').addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                renderCustomers();
            }
        });

        document.getElementById('nextPage').addEventListener('click', function() {
            const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderCustomers();
            }
        });

        // Add customer modal
        const addCustomerBtn = document.getElementById('addCustomerBtn');
        const addCustomerModal = document.getElementById('addCustomerModal');
        const closeModal = document.getElementById('closeModal');
        const cancelBtn = document.getElementById('cancelBtn');

        addCustomerBtn.addEventListener('click', function() {
            addCustomerModal.classList.remove('hidden');
        });

        [closeModal, cancelBtn].forEach(btn => {
            btn.addEventListener('click', function() {
                addCustomerModal.classList.add('hidden');
            });
        });

        // Add customer form
        const addCustomerForm = document.getElementById('addCustomerForm');
        addCustomerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const newCustomer = {
                id: customers.length + 1,
                name: `${formData.get('firstName')} ${formData.get('lastName')}`,
                email: formData.get('email'),
                phone: formData.get('phone'),
                orders: 0,
                totalSpent: 0,
                status: 'active',
                joinDate: new Date().toISOString().split('T')[0]
            };

            customers.push(newCustomer);
            filteredCustomers = [...customers];
            currentPage = 1;
            renderCustomers();
            updateStats();
            
            addCustomerModal.classList.add('hidden');
            this.reset();
            
            showNotification('تم إضافة العميل بنجاح', 'success');
        });
    }

    // Customer actions (global functions)
    window.viewCustomer = function(id) {
        const customer = customers.find(c => c.id === id);
        if (customer) {
            alert(`عرض تفاصيل العميل: ${customer.name}`);
        }
    };

    window.editCustomer = function(id) {
        const customer = customers.find(c => c.id === id);
        if (customer) {
            alert(`تعديل العميل: ${customer.name}`);
        }
    };

    window.deleteCustomer = function(id) {
        if (confirm('هل أنت متأكد من حذف هذا العميل؟')) {
            const index = customers.findIndex(c => c.id === id);
            if (index > -1) {
                customers.splice(index, 1);
                filteredCustomers = [...customers];
                renderCustomers();
                updateStats();
                showNotification('تم حذف العميل بنجاح', 'success');
            }
        }
    };

    // Notification system
    function showNotification(message, type = 'info') {
        const notificationContainer = document.getElementById('notificationContainer');
        if (!notificationContainer) return;

        const notification = document.createElement('div');
        
        const bgColor = type === 'success' ? 'bg-green-500' : 
                       type === 'error' ? 'bg-red-500' : 
                       type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500';
        
        notification.className = `${bgColor} text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
        notification.textContent = message;
        
        notificationContainer.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Initialize the page
    init();
}); 