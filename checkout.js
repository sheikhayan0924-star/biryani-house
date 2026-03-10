// Checkout Page Script
// Your WhatsApp Number
const WHATSAPP_NUMBER = '917019261034'; // Your number: 7019261034

document.addEventListener('DOMContentLoaded', function() {
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    displayOrderSummary();

    // Form submission
    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        sendToWhatsApp();
    });
});

function displayOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    
    // Group items by id and portion
    const groupedItems = {};
    cart.forEach(item => {
        const key = `${item.id}-${item.portion || 'none'}`;
        if (!groupedItems[key]) {
            groupedItems[key] = {
                ...item,
                quantity: 0
            };
        }
        groupedItems[key].quantity++;
    });
    
    orderItems.innerHTML = Object.values(groupedItems).map(item => {
        const price = item.price || 0;
        const portionText = item.portionLabel ? ` (${item.portionLabel})` : '';
        return `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="order-item-info">
                    <h4>${item.name}${portionText}</h4>
                    <p>Qty: ${item.quantity}</p>
                </div>
                <div class="order-item-price">
                    ₹${price * item.quantity}
                </div>
            </div>
        `;
    }).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + 40 + tax;

    document.getElementById('subtotal').textContent = `₹${subtotal}`;
    document.getElementById('tax').textContent = `₹${tax}`;
    document.getElementById('total').textContent = `₹${total}`;
}

function sendToWhatsApp() {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('paymentMethod').value;

    // Group items by id and portion
    const groupedItems = {};
    cart.forEach(item => {
        const key = `${item.id}-${item.portion || 'none'}`;
        if (!groupedItems[key]) {
            groupedItems[key] = {
                ...item,
                quantity: 0
            };
        }
        groupedItems[key].quantity++;
    });

    // Create order details
    const orderDetails = Object.values(groupedItems).map(item => {
        const price = item.price || 0;
        const portionText = item.portionLabel ? ` (${item.portionLabel})` : '';
        return `${item.name}${portionText} x ${item.quantity} = ₹${price * item.quantity}`;
    }).join('%0A');

    const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + 40 + tax;

    // Create WhatsApp message
    const message = `🍛 *New Order from Fathima's Biryani House*%0A%0A` +
        `*Customer Details:*%0A` +
        `Name: ${name}%0A` +
        `Phone: ${phone}%0A` +
        `Address: ${address}%0A` +
        `Payment: ${paymentMethod}%0A%0A` +
        `*Order Items:*%0A${orderDetails}%0A%0A` +
        `*Order Summary:*%0A` +
        `Subtotal: ₹${subtotal}%0A` +
        `Delivery: ₹40%0A` +
        `Tax (5%%): ₹${tax}%0A` +
        `*Total: ₹${total}*`;

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    // Clear cart and redirect
    showNotification('Redirecting to WhatsApp...');
    setTimeout(() => {
        clearCart();
        window.location.href = 'index.html';
    }, 2000);
}
