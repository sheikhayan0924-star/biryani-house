// Menu Page Script
let currentCategory = 'All';
let currentSearch = '';
let currentSort = '';

document.addEventListener('DOMContentLoaded', function() {
    loadProducts();

    // Category buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.dataset.category;
            loadProducts();
        });
    });

    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearch = this.value;
            loadProducts();
        });
    }

    // Sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentSort = this.value;
            loadProducts();
        });
    }

    // Check URL for category parameter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        currentCategory = categoryParam;
        categoryBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === categoryParam) {
                btn.classList.add('active');
            }
        });
        loadProducts();
    }
});

function loadProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;

    const filtered = filterProducts(currentCategory, currentSearch, currentSort);

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(product => `
        <div class="product-card card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-meta">
                    <span class="rating">
                        <i class="fas fa-star"></i> ${product.rating}
                    </span>
                    <span>
                        <i class="fas fa-clock"></i> ${product.preparationTime}
                    </span>
                    <span>
                        <i class="fas fa-fire"></i> ${product.spiceLevel}
                    </span>
                </div>
                <div class="product-footer">
                    ${product.hasPortions !== false ? `
                    <div class="portion-selector">
                        <button class="portion-btn active" onclick="selectPortion(${product.id}, 'half')" id="half-${product.id}">
                            Half - ₹80
                        </button>
                        <button class="portion-btn" onclick="selectPortion(${product.id}, 'full')" id="full-${product.id}">
                            Full - ₹160
                        </button>
                    </div>
                    ` : `
                    <div class="price">
                        ${product.discountPrice > 0 ? `
                            <span class="original-price">₹${product.price}</span>
                            <span class="discount-price">₹${product.discountPrice}</span>
                        ` : `
                            <span class="current-price">₹${product.price}</span>
                        `}
                    </div>
                    `}
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="decreaseQuantity(${product.id})">-</button>
                        <input type="number" id="qty-${product.id}" value="1" min="1" max="10" readonly>
                        <button class="qty-btn" onclick="increaseQuantity(${product.id})">+</button>
                    </div>
                    <button class="btn btn-primary" onclick="addToCartWithQuantity(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Quantity control functions
function selectPortion(productId, portion) {
    // Remove active class from both buttons
    document.getElementById(`half-${productId}`).classList.remove('active');
    document.getElementById(`full-${productId}`).classList.remove('active');
    
    // Add active class to selected button
    document.getElementById(`${portion}-${productId}`).classList.add('active');
    
    // Store selected portion
    const qtyInput = document.getElementById(`qty-${productId}`);
    qtyInput.dataset.portion = portion;
}

function increaseQuantity(productId) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    let currentQty = parseInt(qtyInput.value);
    if (currentQty < 10) {
        qtyInput.value = currentQty + 1;
    }
}

function decreaseQuantity(productId) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    let currentQty = parseInt(qtyInput.value);
    if (currentQty > 1) {
        qtyInput.value = currentQty - 1;
    }
}

function addToCartWithQuantity(productId) {
    const qtyInput = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(qtyInput.value);
    
    // Get product details
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Check if product has portions
    const hasPortion = product.hasPortions !== false;
    let portion = 'half';
    let portionPrice = product.price;
    let portionLabel = '';
    
    if (hasPortion) {
        portion = qtyInput.dataset.portion || 'half';
        portionPrice = portion === 'half' ? 80 : 160;
        portionLabel = portion === 'half' ? 'Half' : 'Full';
    } else {
        // Use product's actual price for non-portion items
        portionPrice = product.discountPrice > 0 ? product.discountPrice : product.price;
    }
    
    // Get existing cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Create cart item
    const cartItem = {
        id: productId,
        name: product.name,
        price: portionPrice,
        image: product.image,
        portion: hasPortion ? portion : null,
        portionLabel: hasPortion ? portionLabel : null
    };
    
    // Add items based on quantity
    for (let i = 0; i < quantity; i++) {
        cart.push({...cartItem});
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    if (hasPortion) {
        alert(`${quantity} ${portionLabel} portion(s) added to cart! (₹${portionPrice} each)`);
    } else {
        alert(`${quantity} ${product.name} added to cart! (₹${portionPrice} each)`);
    }
    
    // Reset quantity to 1
    qtyInput.value = 1;
}

