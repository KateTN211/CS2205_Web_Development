document.addEventListener("DOMContentLoaded", () => {
    const subscribeButton = document.getElementById("subscribeButton");
    const nameInput = document.getElementById("nameInput");
    const emailInput = document.getElementById("emailInput");

    subscribeButton.addEventListener("click", (event) => {
        event.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nameInput.value.trim() === "" || emailInput.value.trim() === "") {
            alert("Please fill out all fields!");
        } else if (!emailRegex.test(emailInput.value.trim())) {
            alert("Please enter a valid email address!");
        } else {
            nameInput.value = "";
            emailInput.value = "";
            alert("Thank you for subscribing!");
        }
    });
});