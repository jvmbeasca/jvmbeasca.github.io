document.addEventListener('DOMContentLoaded', function() {
    // Always show 5 items in cart count
    updateCartCount();
    
    // Calculate and display static totals
    calculateStaticTotals();
});

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(element => {
        element.textContent = '5'; // Always show 5 items
    });
    
    // Always enable checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.disabled = false;
    }
}

function calculateStaticTotals() {
    const subtotal = 6.95; // $0.99 x 3 items + $1.99 x 2 items
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}