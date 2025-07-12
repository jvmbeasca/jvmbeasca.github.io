// General JavaScript for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to all pages
    document.body.classList.add('fade-in');
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Credit card input formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            let value = this.value.replace(/\s+/g, ''); // Remove all spaces
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,4}', 'g')).join(' '); // Add space every 4 digits
            }
            this.value = value;
        });
    }
    
    // Expiry date input formatting
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, ''); // Remove non-digits
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4); // Add slash after MM
            }
            this.value = value;
        });
    }
});