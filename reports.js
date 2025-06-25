// Chart instances
let salesChart = null;
let productsChart = null;

// Sample data
const sampleData = {
    sales: {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
        data: [45000, 52000, 48000, 61000, 55000, 68000]
    },
    products: {
        labels: ['فلتر زيت', 'فرامل', 'بطارية', 'شمعات', 'زيت محرك'],
        data: [234, 189, 156, 145, 123]
    }
};

// DOM Elements
const dateFrom = document.getElementById('dateFrom');
const dateTo = document.getElementById('dateTo');
const generateReportBtn = document.getElementById('generateReport');
const exportReportBtn = document.getElementById('exportReportBtn');
const printReportBtn = document.getElementById('printReportBtn');
const salesChartType = document.getElementById('salesChartType');
const viewAllProducts = document.getElementById('viewAllProducts');

// Date range buttons
const lastWeek = document.getElementById('lastWeek');
const lastMonth = document.getElementById('lastMonth');
const lastQuarter = document.getElementById('lastQuarter');
const lastYear = document.getElementById('lastYear');

// Initialize charts
function initializeCharts() {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    salesChart = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: sampleData.sales.labels,
            datasets: [{
                label: 'المبيعات (ر.س)',
                data: sampleData.sales.data,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString() + ' ر.س';
                        }
                    }
                }
            }
        }
    });

    // Products Chart
    const productsCtx = document.getElementById('productsChart').getContext('2d');
    productsChart = new Chart(productsCtx, {
        type: 'doughnut',
        data: {
            labels: sampleData.products.labels,
            datasets: [{
                data: sampleData.products.data,
                backgroundColor: [
                    '#3b82f6',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            }
        }
    });
}

// Set date range
function setDateRange(days) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    dateFrom.value = startDate.toISOString().split('T')[0];
    dateTo.value = endDate.toISOString().split('T')[0];
}

// Update chart type
function updateSalesChartType(type) {
    if (salesChart) {
        salesChart.destroy();
    }
    
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const config = {
        type: type,
        data: {
            labels: sampleData.sales.labels,
            datasets: [{
                label: 'المبيعات (ر.س)',
                data: sampleData.sales.data,
                borderColor: '#3b82f6',
                backgroundColor: type === 'line' ? 'rgba(59, 130, 246, 0.1)' : '#3b82f6',
                borderWidth: 3,
                fill: type === 'area',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString() + ' ر.س';
                        }
                    }
                }
            }
        }
    };
    
    salesChart = new Chart(salesCtx, config);
}

// Generate report
function generateReport() {
    const fromDate = dateFrom.value;
    const toDate = dateTo.value;
    
    if (!fromDate || !toDate) {
        showNotification('يرجى تحديد نطاق التاريخ', 'error');
        return;
    }
    
    if (new Date(fromDate) > new Date(toDate)) {
        showNotification('تاريخ البداية يجب أن يكون قبل تاريخ النهاية', 'error');
        return;
    }
    
    showNotification('جاري إنشاء التقرير...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        // Update summary cards with new data
        updateSummaryCards();
        
        // Update charts with new data
        updateCharts();
        
        showNotification('تم إنشاء التقرير بنجاح!', 'success');
    }, 2000);
}

// Update summary cards
function updateSummaryCards() {
    const cards = document.querySelectorAll('.report-card .text-2xl');
    cards.forEach((card, index) => {
        const currentValue = parseInt(card.textContent.replace(/[^\d]/g, ''));
        const newValue = currentValue + Math.floor(Math.random() * 1000);
        
        // Animate counter
        animateCounter(card, newValue);
    });
}

// Animate counter
function animateCounter(element, target) {
    let start = 0;
    const increment = target / 50;
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString() + ' ر.س';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + ' ر.س';
        }
    }
    
    updateCounter();
}

// Update charts
function updateCharts() {
    // Generate new random data
    const newSalesData = sampleData.sales.data.map(() => Math.floor(Math.random() * 50000) + 30000);
    const newProductsData = sampleData.products.data.map(() => Math.floor(Math.random() * 200) + 50);
    
    // Update sales chart
    if (salesChart) {
        salesChart.data.datasets[0].data = newSalesData;
        salesChart.update();
    }
    
    // Update products chart
    if (productsChart) {
        productsChart.data.datasets[0].data = newProductsData;
        productsChart.update();
    }
}

// Export report
function exportReport() {
    showNotification('جاري تصدير التقرير...', 'info');
    
    // Simulate export process
    setTimeout(() => {
        const reportData = {
            dateRange: {
                from: dateFrom.value,
                to: dateTo.value
            },
            summary: {
                totalSales: '125,430 ر.س',
                totalOrders: '1,234',
                averageOrder: '101.6 ر.س',
                newCustomers: '89'
            },
            charts: {
                sales: sampleData.sales,
                products: sampleData.products
            }
        };
        
        // Create and download JSON file
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('تم تصدير التقرير بنجاح!', 'success');
    }, 1500);
}

// Print report
function printReport() {
    showNotification('جاري إعداد الطباعة...', 'info');
    
    setTimeout(() => {
        window.print();
        showNotification('تم إرسال التقرير للطباعة!', 'success');
    }, 1000);
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
    // Initialize charts
    initializeCharts();
    
    // Set default date range (last month)
    setDateRange(30);
    
    // Date range buttons
    lastWeek.addEventListener('click', () => setDateRange(7));
    lastMonth.addEventListener('click', () => setDateRange(30));
    lastQuarter.addEventListener('click', () => setDateRange(90));
    lastYear.addEventListener('click', () => setDateRange(365));
    
    // Chart type change
    salesChartType.addEventListener('change', (e) => {
        updateSalesChartType(e.target.value);
    });
    
    // Generate report
    generateReportBtn.addEventListener('click', generateReport);
    
    // Export report
    exportReportBtn.addEventListener('click', exportReport);
    
    // Print report
    printReportBtn.addEventListener('click', printReport);
    
    // View all products
    viewAllProducts.addEventListener('click', () => {
        showNotification('سيتم إضافة صفحة تفصيلية للمنتجات قريباً', 'info');
    });
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('مرحباً بك في صفحة التقارير!', 'info');
    }, 1000);
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to generate report
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        generateReport();
    }
    
    // Ctrl/Cmd + E to export
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportReport();
    }
    
    // Ctrl/Cmd + P to print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printReport();
    }
});

// Export functions for global access
window.generateReport = generateReport;
window.exportReport = exportReport;
window.printReport = printReport;
window.showNotification = showNotification; 