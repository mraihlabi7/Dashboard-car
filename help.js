// Help Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggle Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const content = faqItem.querySelector('.faq-content');
            const icon = this.querySelector('i');
            
            // Toggle active class
            content.classList.toggle('active');
            
            // Rotate icon
            if (content.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Search Functionality
    const searchInput = document.getElementById('helpSearch');
    const faqItems = document.querySelectorAll('.faq-item');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question span').textContent.toLowerCase();
            const answer = item.querySelector('.faq-content').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Category Filter Functionality
    window.showCategory = function(category) {
        // This function can be expanded to show specific help categories
        console.log('Showing category:', category);
        
        // For now, just scroll to FAQ section
        const faqSection = document.getElementById('faqContainer');
        faqSection.scrollIntoView({ behavior: 'smooth' });
    };

    // Contact Support Button
    const contactSupportBtn = document.getElementById('contactSupportBtn');
    if (contactSupportBtn) {
        contactSupportBtn.addEventListener('click', function() {
            // Scroll to contact section
            const contactSection = document.querySelector('.bg-white.rounded-xl.shadow-sm.p-6.mb-8:last-of-type');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Video Tutorial Buttons
    const videoButtons = document.querySelectorAll('.bg-gray-100 button');
    videoButtons.forEach(button => {
        button.addEventListener('click', function() {
            // This would typically open a video modal or navigate to video page
            alert('سيتم فتح الفيديو التعليمي قريباً');
        });
    });

    // Live Chat Button
    const chatButton = document.querySelector('.text-sm.text-purple-600.hover\\:text-purple-700.font-medium');
    if (chatButton) {
        chatButton.addEventListener('click', function() {
            // This would typically open a chat widget
            alert('سيتم فتح الدردشة المباشرة قريباً');
        });
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notificationContainer = document.getElementById('notificationContainer');
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

    // Example usage of notifications
    // showNotification('تم تحميل صفحة المساعدة بنجاح', 'success');
}); 