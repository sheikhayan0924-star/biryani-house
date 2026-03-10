// Cart Page Script
document.addEventListener('DOMContentLoaded', function() {
    displayCart();

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showNotification('Your cart is empty!');
                return;
            }
            window.location.href = 'checkout.html';
        });
    }
});

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');

    if (cart.length === 0) {
        emptyCart.style.display = 'flex';
        cartContent.style.display = 'none';
        return;
    }

    emptyCart.style.display = 'none';
    cartContent.style.display = 'grid';

    cartItems.innerHTML = cart.map((item, index) => {
        const price = item.price || (item.discountPrice > 0 ? item.discountPrice : item.price);
        const portionLabel = item.portionLabel || '';
        return `
            <div class="cart-item card">
                <div class="item-number">${index + 1}</div>
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    ${portionLabel ? `<p class="item-portion">${portionLabel} Portion</p>` : ''}
                    <p class="item-price">₹${price}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCartByIndex(${index}); displayCart();">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');

    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + 40 + tax;

    document.getElementById('subtotal').textContent = `₹${subtotal}`;
    document.getElementById('tax').textContent = `₹${tax}`;
    document.getElementById('total').textContent = `₹${total}`;
}

function removeFromCartByIndex(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Override updateQuantity to refresh display
const originalUpdateQuantity = updateQuantity;
updateQuantity = function(productId, quantity) {
    originalUpdateQuantity(productId, quantity);
    displayCart();
};
