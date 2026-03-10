// Home Page Script
document.addEventListener('DOMContentLoaded', function() {
    // Load featured products
    loadFeaturedProducts();

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
});

function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const featured = products.slice(0, 6);
    
    container.innerHTML = featured.map(product => `
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
                    <div class="price">
                        ${product.discountPrice > 0 ? `
                            <span class="original-price">₹${product.price}</span>
                            <span class="discount-price">₹${product.discountPrice}</span>
                        ` : `
                            <span class="current-price">₹${product.price}</span>
                        `}
                    </div>
                    <button class="btn btn-primary" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}
