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
