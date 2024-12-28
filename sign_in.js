document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send login request to backend
    try {
        const response = await fetch('http://localhost:3000/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Successful login, save JWT token in localStorage
            localStorage.setItem('token', data.token);
            alert('Sign-in successful!');
            window.location.href = 'ezbroker.html'; // Redirect to user dashboard or protected page
        } else {
            // Handle error (invalid credentials)
            alert(data.message || 'Sign-in failed. Please check your credentials.');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred while signing in');
    }
});
// Sample hardcoded user data (you would typically get this from a backend)
const users = [
    { email: "user@example.com", password: "password123" },  // Example user
    { email: "admin@example.com", password: "admin123" }     // Another example user
];

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Get the email and password values entered by the user
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if the email and password match any user in the users array
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // If user is found, redirect to the next page (replace 'dashboard.html' with the actual page)
        window.location.href = "dashboard.html";  // Example page after successful login
    } else {
        // If user is not found or credentials are incorrect, show an alert
        alert("Invalid email or password. Please try again.");
    }
});
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Get the entered email and password
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Get the users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the user exists and the password matches
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // If user is found, redirect to the next page (replace 'dashboard.html' with the actual page)
        window.location.href = "index.html";  // Example page after successful login
    } else {
        // If user is not found or credentials are incorrect, show an alert
        alert("Invalid email or password. Please try again.");
    }
});
