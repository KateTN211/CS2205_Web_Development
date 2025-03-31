const { update } = require("three/examples/jsm/libs/tween.module.js");

let shoppingCart = [];

document.addEventListener("DOMContentLoaded", () => {
    const productItems = document.querySelectorAll(".product-item");
    productItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            const productTitle = item.querySelector(".product-title").textContent;
            addToCart(productTitle);
            updateCartModal();
        });
    });

    document.getElementById("clearCartButton").addEventListener("click", () => {
        clearCart();
    });

    document.getElementById("processOrderButton").addEventListener("click", () => {
        processOrder();
    });
    updateCartModal();
});


function addToCart(productName) {
    let shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart")) || [];
    const existingProduct = shoppingCart.find((item) => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        shoppingCart.push({ name: productName, quantity: 1 });
    }

    sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    alert(`Item added to cart: ${productName}`);
}

function updateCartModal() {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = "";
    let shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart")) || [];

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

function clearCart() {
    sessionStorage.removeItem("shoppingCart");
    updateCartModal();
    alert("Cart is cleared!");
}

function processOrder() {
    let shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart")) || [];

    if (shoppingCart.length === 0) {
        alert("Your cart is empty. Add items before processing the order.");
        return;
    }

    sessionStorage.removeItem("shoppingCart");
    updateCartModal();
    alert("Thank you for your order!");
}