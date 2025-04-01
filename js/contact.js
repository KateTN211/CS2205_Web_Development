document.addEventListener("DOMContentLoaded", function () {
    // Add custom order checkbox and details field to the form
    const messageField = document.querySelector('.form-group.mb-5');

    // Insert custom order checkbox after message field
    const customOrderHTML = `
    <div class="form-group mb-3">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="isCustomOrder">
            <label class="form-check-label text-black" for="isCustomOrder">
                This is a custom order request
            </label>
        </div>
    </div>
    <div class="form-group mb-5" id="orderDetailsGroup" style="display: none;">
        <label class="text-black" for="orderDetails">Custom Order Details</label>
        <textarea class="form-control" id="orderDetails" cols="30" rows="3" 
            placeholder="Please describe your custom order requirements..."></textarea>
    </div>
    `;

    messageField.insertAdjacentHTML('afterend', customOrderHTML);

    // Show/hide order details based on checkbox
    const isCustomOrderCheckbox = document.getElementById('isCustomOrder');
    const orderDetailsGroup = document.getElementById('orderDetailsGroup');

    isCustomOrderCheckbox.addEventListener('change', function () {
        orderDetailsGroup.style.display = this.checked ? 'block' : 'none';
    });

    // Use the existing event listener for the submit button
    const sendMessageButton = document.querySelector("button[type='submit']");
    sendMessageButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission

        // Get the values from the input fields
        const firstName = document.getElementById("fname").value.trim();
        const lastName = document.getElementById("lname").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const isCustomOrder = document.getElementById("isCustomOrder").checked;
        const orderDetails = document.getElementById("orderDetails").value.trim();

        // Validate the input fields
        if (firstName === "" || lastName === "" || email === "" || message === "") {
            alert("Please fill in all fields!");
            return;
        }

        // Additional validation for custom orders
        if (isCustomOrder && orderDetails === "") {
            alert("Please provide details for your custom order!");
            return;
        }

        // Save to localStorage
        const formData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            message: message,
            isCustomOrder: isCustomOrder,
            orderDetails: orderDetails,
            timestamp: new Date().toISOString()
        };

        // Save to localStorage
        saveToLocalStorage(formData);

        // Display a personalized alert
        const fullName = `${firstName} ${lastName}`;
        const orderMessage = isCustomOrder ?
            "\nWe have received your custom order request and will get back to you soon." :
            "\nWe will respond to your message shortly.";

        alert(`Thank you for your message, ${fullName}!${orderMessage}`);

        // Clear the input fields
        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        document.getElementById("isCustomOrder").checked = false;
        document.getElementById("orderDetails").value = "";
        orderDetailsGroup.style.display = 'none';
    });

    function saveToLocalStorage(formData) {
        // Get existing orders or initialize empty array
        let customOrders = JSON.parse(localStorage.getItem('customOrders')) || [];

        // Add new order
        customOrders.push(formData);

        // Save back to localStorage
        localStorage.setItem('customOrders', JSON.stringify(customOrders));

        // Also save as the latest order
        localStorage.setItem('latestCustomOrder', JSON.stringify(formData));

        console.log('Form data saved to localStorage:', formData);
    }
});