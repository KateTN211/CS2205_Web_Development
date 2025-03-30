document.addEventListener("DOMContentLoaded", function () {
    const sendMessageButton = document.querySelector("button[type='submit']");
    sendMessageButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission

        // Get the values from the input fields
        const firstName = document.getElementById("fname").value;
        const lastName = document.getElementById("lname").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        // Validate the input fields
        if (firstName === "" || lastName === "" || email === "" || message === "") {
            alert("Please fill in all fields!");
            return;
        }

        // Display the alert
        alert("Thank you for your message!");

        // Clear the input fields
        document.getElementById("fname").value = ""; 
        document.getElementById("lname").value = ""; 
        document.getElementById("email").value = ""; 
        document.getElementById("message").value = ""; 
    });
});