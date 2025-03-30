// Initialize an empty shopping cart
let shoppingCart = [];

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Select all product items
    const productItems = document.querySelectorAll(".product-item");

    // Add click event listener to each product item
    productItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link behavior

            // Get the product title
            const productTitle = item.querySelector(".product-title").textContent;

            // Add the product to the shopping cart
            addToCart(productTitle);

            // Update the cart modal
            updateCartModal();
        });
    });

    // Add event listener for the "Clear Cart" button
    document.getElementById("clearCartButton").addEventListener("click", () => {
        clearCart();
    });

    // Add event listener for the "Process Order" button
    document.getElementById("processOrderButton").addEventListener("click", () => {
        processOrder();
    });
});

// Function to add an item to the shopping cart
function addToCart(productName) {
    // Check if the product is already in the cart
    const existingProduct = shoppingCart.find((item) => item.name === productName);

    if (existingProduct) {
        // If the product exists, increase its quantity
        existingProduct.quantity += 1;
    } else {
        // If the product doesn't exist, add it to the cart
        shoppingCart.push({ name: productName, quantity: 1 });
    }

    // Notify the user
    alert(`Item added to cart: ${productName}`);
}

// Function to update the cart modal
function updateCartModal() {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = ""; // Clear the current cart display

    if (shoppingCart.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.className = "list-group-item text-center";
        emptyMessage.textContent = "Your cart is empty.";
        cartItemsContainer.appendChild(emptyMessage);
        return;
    }

    shoppingCart.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.textContent = `${item.name}`;
        const quantityBadge = document.createElement("span");
        quantityBadge.className = "badge bg-primary rounded-pill";
        quantityBadge.textContent = `Quantity: ${item.quantity}`;
        listItem.appendChild(quantityBadge);
        cartItemsContainer.appendChild(listItem);
    });
}

// Function to clear the cart
function clearCart() {
    shoppingCart = []; // Empty the cart
    updateCartModal(); // Update the modal to reflect the empty cart
    alert("Cart is cleared!");
}

// Function to process the order
function processOrder() {
    if (shoppingCart.length === 0) {
        alert("Your cart is empty. Add items before processing the order.");
        return;
    }

    // Clear the cart after processing the order
    shoppingCart = [];
    updateCartModal();
    window.location.href = "cart.html"; // Redirect to thank you page
}