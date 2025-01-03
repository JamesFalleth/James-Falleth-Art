// Sample product data (Replace this with your actual products)
const products = [
    { id: 1, name: 'Art Piece 1', price: 500, image: 'painting1.jpg' },
    { id: 2, name: 'Art Piece 2', price: 600, image: 'painting2.jpg' },
    { id: 3, name: 'Art Print 1', price: 50, image: 'print1.jpg' },
    { id: 4, name: 'Art Print 2', price: 60, image: 'print2.jpg' }
];

// Function to update the cart count in the navigation (on all pages)
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count')?.textContent = cart.length;
}

// Function to add a product to the cart
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);

    // Check if product already exists in the cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        alert(`${product.name} is already in the cart.`);
    } else if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    }
    updateCartCount();
}

// Event listener for "Add to Cart" buttons on all product pages
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(button.dataset.productId);
            addToCart(productId);
        });
    });
    updateCartCount();
});

// Function to display cart items on the cart page
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    // Clear previous cart items
    cartList?.innerHTML = '';

    // Loop through cart and display each item
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartList?.appendChild(li);
        totalPrice += item.price;
    });

    totalPriceElement?.textContent = totalPrice;
}

// Populate the cart on the cart page (only on the cart page)
if (document.body.id === "cart-page") {
    displayCartItems();
}

// Function to proceed to checkout
document.getElementById('checkout-button')?.addEventListener('click', function() {
    alert('Proceeding to checkout...');
    // Add payment integration logic here
});
