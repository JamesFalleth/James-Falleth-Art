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
    document.getElementById('cart-count').textContent = cart.length;
}

// Function to add a product to the cart
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);

    console.log('Initial Cart:', cart);  // Debugging: Log the initial cart

    // Add product to cart if it doesn't already exist
    if (product && !cart.some(item => item.id === productId)) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    } else {
        alert('Product already in cart or not found.');
    }

    // Update cart count after adding the product
    updateCartCount();
}

// Event listener for "Add to Cart" buttons on all product pages (e.g., paintings.html, prints.html)
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = parseInt(button.dataset.productId);  // Ensure productId is an integer
        addToCart(productId);
    });
});

// Call updateCartCount to initialize the cart count on page load (for all pages)
updateCartCount();

// Function to display cart items on the cart page (cart.html)
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    // Clear previous cart items
    cartList.innerHTML = '';

    // Loop through cart and display each item
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
        totalPrice += item.price;
    });

    // Update total price in the cart
    totalPriceElement.textContent = totalPrice;
}

// Call displayCartItems to populate the cart on the cart page (only on the cart page)
if (document.body.id === "cart-page") {
    displayCartItems();
}

// Function to proceed to checkout (this is where you can add payment integration like PayPal)
document.getElementById('checkout-button')?.addEventListener('click', function() {
    alert('Proceeding to checkout...');
    // You can integrate PayPal API or other payment methods here
});
