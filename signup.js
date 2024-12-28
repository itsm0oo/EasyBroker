document.getElementById('signUpForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Send sign-up request to the backend
    try {
        const response = await fetch('http://localhost:3000/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Sign-up successful!');
            window.location.href = 'sign-in.html'; // Redirect to sign-in page after registration
        } else {
            alert(data.message || 'Sign-up failed.');
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred during sign-up.');
    }
});
// Check if the user is authenticated before accessing a protected page
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'sign-in.html'; // Redirect to sign-in if no token
}
document.getElementById("signUpForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Get the entered email, password, and confirm password
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
    }

    // Check if the user already exists
    const users = JSON.parse(localStorage.getItem("users")) || []; // Get users from localStorage or initialize an empty array

    // Check if the email already exists
    if (users.some(user => user.email === email)) {
        alert("An account with this email already exists. Please log in.");
        return;
    }

    // Add the new user to the users array
    users.push({ email, password });

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully! You can now sign in.");

    // Redirect to the sign-in page after successful sign-up
    window.location.href = "sign-in.html";
});
