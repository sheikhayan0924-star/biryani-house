// Products Database
const products = [
    {
        id: 1,
        name: 'Chicken Biryani',
        description: 'Authentic Hyderabadi style chicken biryani with aromatic basmati rice, tender chicken pieces, and traditional spices.',
        price: 160,
        discountPrice: 0,
        category: 'Chicken Biryani',
        image: 'images/photo-1563379091339-03b21ab4a4f8.jpg',
        rating: 4.8,
        spiceLevel: 'Medium',
        preparationTime: '35-45 mins'
    },
    {
        id: 2,
        name: 'Madrasi Dum Biryani',
        description: 'Slow-cooked mutton biryani with fragrant spices and tender meat pieces, served with raita.',
        price: 180,
        discountPrice:0,
        category: 'Madrasi dum biryani',
        image: 'images/madrasi biryani.jpg',
        rating: 4.9,
        spiceLevel: 'Spicy',
        preparationTime: '45-55 mins'
    },
    {
        id: 3,
        name: 'Special Biryani',
        description: 'Delicious vegetable biryani loaded with fresh vegetables, paneer, and aromatic spices.',
        price: 160,
        discountPrice: 0,
        category: 'Veg Biryani',
        image: 'images/chiken biryani.jpg',
        rating: 4.5,
        spiceLevel: 'Mild',
        preparationTime: '30-40 mins'
    },
    {
        id: 4,
        name: 'Egg Biryani',
        description: 'Flavorful egg biryani with boiled eggs cooked in aromatic spices and basmati rice.',
        price: 150,
        discountPrice:0,
        category: 'Egg Biryani',
        image: 'images/egg.jpg',
        rating: 4.4,
        spiceLevel: 'Medium',
        preparationTime: '25-35 mins'
    },
    {
        id: 5,
        name: 'Chicken 65(4 pieces)',
        description: 'Crispy and spicy deep-fried chicken appetizer with South Indian flavors.',
        price: 100,
        discountPrice: 0,
        category: 'Starters',
        image: 'images/Chicken-65-recipe.jpg',
        rating: 4.7,
        spiceLevel: 'Spicy',
        preparationTime: '40-45 mins',
        hasPortions: false
    },
    {
        id: 6,
        name: 'chana special',
        description: 'mom made chana special South Indian flavors.',
        price: 80,
        discountPrice: 0,
        category: 'Starters',
        image: 'images/Kala-Chana-Chaat.jpg',
        rating: 4.7,
        spiceLevel: 'Spicy',
        preparationTime: '20-25 mins',
        hasPortions: false
    },
    
    
    
    {
        id: 8,
        name: 'Gulab Jamun (8 pieces)',
        description: 'Soft and spongy milk-solid dumplings soaked in sugar syrup.',
        price: 90,
        pices:8,
        discountPrice: 0,
        category: 'Desserts',
        image: 'images/gulab-jamun-recipe-2.jpg',
        rating: 4.8,
        spiceLevel: 'Mild',
        preparationTime: '25-30 mins',
        hasPortions: false
    }
];

// Get product by ID
function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

// Filter products
function filterProducts(category = 'All', search = '', sort = '') {
    let filtered = [...products];

    // Filter by category
    if (category && category !== 'All') {
        filtered = filtered.filter(p => p.category === category);
    }

    // Search
    if (search) {
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    // Sort
    if (sort === 'price-low') {
        filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sort === 'price-high') {
        filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
}
