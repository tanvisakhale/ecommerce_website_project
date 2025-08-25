// Enhanced JavaScript for E-Shop - All Pages Functionality

// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [
    { id: 1, name: 'Wireless Headphones', price: 7499, category: 'electronics', image: 'images/Wireless Headphones.jpg' },
    { id: 2, name: 'Smart Watch', price: 5999, category: 'electronics', image: 'images/smart watch.jpg' },
    { id: 3, name: 'Laptop Stand', price: 4499, category: 'electronics', image: 'images/laptop stand.jpg' },
    { id: 4, name: 'Phone Case', price: 3749, category: 'electronics', image: 'images/phone case.jpg' },
    { id: 5, name: 'Bluetooth Speaker', price: 6749, category: 'electronics', image: 'images/Bluetooth Speaker.jpg' },
    { id: 6, name: 'USB Cable', price: 1499, category: 'electronics', image: 'images/USB Cable.jpg' },
    { id: 7, name: 'Power Bank', price: 5249, category: 'electronics', image: 'images/Power Bank.jpg' },
    { id: 8, name: 'Wireless Mouse', price: 2999, category: 'electronics', image: 'images/Wireless Mouse.jpg' },
    { id: 9, name: 'Denim Jacket', price: 6749, category: 'fashion', image: 'images/Denim Jacket.jpg' },
    { id: 10, name: 'Running Shoes', price: 9749, category: 'fashion', image: 'images/Running Shoes.jpg' },
    { id: 11, name: 'Leather Bag', price: 11249, category: 'fashion', image: 'images/Leather Bag.jpg' },
    { id: 12, name: 'Sunglasses', price: 5999, category: 'fashion', image: 'images/Sunglasses.jpg' },
    { id: 13, name: 'Watch', price: 14999, category: 'fashion', image: 'images/Watch.jpg' },
    { id: 14, name: 'Scarf', price: 2249, category: 'fashion', image: 'images/Scarf.jpg' },
    { id: 15, name: 'Belt', price: 3749, category: 'fashion', image: 'images/Belt.jpg' },
    { id: 16, name: 'Wallet', price: 2999, category: 'fashion', image: 'images/Wallet.jpg' },
    { id: 17, name: 'T-Shirt', price: 1874, category: 'fashion', image: 'images/T-Shirt.jpg' },
    { id: 18, name: 'Jeans', price: 5249, category: 'fashion', image: 'images/Jeans.jpg' },
    { id: 19, name: 'Dress', price: 6749, category: 'fashion', image: 'images/Dress.jpg' },
    { id: 20, name: 'Sneakers', price: 7499, category: 'fashion', image: 'images/Sneakers.jpg' },
    { id: 21, name: 'Coffee Maker', price: 6749, category: 'home', image: 'images/Coffee Maker.jpg' },
    { id: 22, name: 'Blender', price: 4499, category: 'home', image: 'images/Blender.jpg' },
    { id: 23, name: 'Toaster', price: 2999, category: 'home', image: 'images/Toaster.jpg' },
    { id: 24, name: 'Microwave', price: 9749, category: 'home', image: 'images/Microwave.jpg' },
    { id: 25, name: 'Vacuum Cleaner', price: 14999, category: 'home', image: 'images/Vacuum Cleaner.jpg' },
    { id: 26, name: 'Garden Hose', price: 2249, category: 'home', image: 'images/Garden Hose.jpg' },
    { id: 27, name: 'Plant Pot', price: 1499, category: 'home', image: 'images/Plant Pot.jpg' },
    { id: 28, name: 'Garden Tools', price: 3749, category: 'home', image: 'images/Garden Tools.jpg' },
    { id: 29, name: 'Table Lamp', price: 5999, category: 'home', image: 'images/Table Lamp.jpg' },
    { id: 30, name: 'Throw Pillow', price: 1874, category: 'home', image: 'images/Throw Pillow.jpg' },
    { id: 31, name: 'Wall Clock', price: 2624, category: 'home', image: 'images/Wall Clock.jpg' },
    { id: 32, name: 'Cushion', price: 1499, category: 'home', image: 'images/Cushion.jpg' },
    { id: 33, name: 'Rug', price: 6749, category: 'home', image: 'images/Rug.jpg' },
    { id: 34, name: 'Curtains', price: 5249, category: 'home', image: 'images/Curtains.jpg' },
    { id: 35, name: 'Mirror', price: 8999, category: 'home', image: 'images/Mirror.jpg' }
];

// Cart Management Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        showNotification('Product added to cart!');
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification('Product removed from cart!');
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(newQuantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartTableBody = document.getElementById('cartTableBody');
    if (cartTableBody) {
        cartTableBody.innerHTML = '';
        cart.forEach(item => {
            const row = document.createElement('tr');
            const itemTotal = item.price * item.quantity;
            
            row.innerHTML = `
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;" class="me-3">
                        <div>
                            <h6 class="mb-0">${item.name}</h6>
                            <small class="text-muted">${item.category}</small>
                        </div>
                    </div>
                </td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>
                    <div class="input-group" style="width: 120px;">
                        <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="form-control text-center" onchange="updateQuantity(${item.id}, this.value)">
                        <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </td>
                <td class="fw-bold">₹${itemTotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            cartTableBody.appendChild(row);
        });
    }
}

// Product Display Functions
function filterProducts(category, priceRange) {
    let filteredProducts = products;
    
    if (category && category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    if (priceRange && priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        filteredProducts = filteredProducts.filter(p => p.price >= min && p.price <= max);
    }
    
    displayProducts(filteredProducts);
}

function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filteredProducts);
}

function displayProducts(productsToShow) {
    const container = document.querySelector('.row');
    if (container) {
        container.innerHTML = '';
        productsToShow.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'col-md-3 mb-3';
            productCard.innerHTML = `
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-primary fw-bold">₹${product.price.toFixed(2)}</p>
                        <div class="mt-auto">
                            <button class="btn btn-primary btn-sm me-2" onclick="addToCart(${product.id})">
                                <i class="bi bi-cart-plus"></i> Add to Cart
                            </button>
                            <a href="product-view.html?id=${product.id}" class="btn btn-outline-secondary btn-sm">View</a>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(productCard);
        });
    }
}

// Checkout Functions
function processCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Simulate checkout process
    showNotification('Processing your order...', 'info');
    
    setTimeout(() => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        showNotification('Order placed successfully!', 'success');
        window.location.href = 'confirmation.html';
    }, 2000);
}

// Utility Functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function formatPrice(price) {
    return `₹${price.toFixed(2)}`;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    
    // Set up search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchProducts(this.value);
        });
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const query = searchInput ? searchInput.value : '';
            searchProducts(query);
        });
    }
    
    // Set up checkout form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processCheckout();
        });
    }
    
    // Load product view data
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (productId && window.location.pathname.includes('product-view.html')) {
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            document.getElementById('productName').textContent = product.name;
            document.getElementById('productPrice').textContent = formatPrice(product.price);
            document.getElementById('productImage').src = product.image;
            document.getElementById('productDescription').textContent = `This is a high-quality ${product.name} available at an amazing price.`;
        }
    }
});

// Export functions to global scope for inline HTML calls
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.searchProducts = searchProducts;
window.filterProducts = filterProducts;
window.processCheckout = processCheckout;
window.showNotification = showNotification;
window.formatPrice = formatPrice;