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

            // Display the product title in an alert box
            alert("Item added to cart: " + productTitle);
        });
    });
});