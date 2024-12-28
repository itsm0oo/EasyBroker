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
