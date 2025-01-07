document.getElementById("signUpForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email-signup").value;
    const password = document.getElementById("password-signup").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Sign-Up failed.");
            }
        })
        .then((message) => {
            alert(message);
            window.location.href = "sign-in.html"; // Redirect to Sign-In page
        })
        .catch((error) => alert(error.message));
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email-signin").value;
    const password = document.getElementById("password-signin").value;

    fetch("http://localhost:4000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error("Invalid email or password.");
            }
        })
        .then((message) => {
            alert(message);
            window.location.href = "main.html"; // Redirect to dashboard
        })
        .catch((error) => alert(error.message));
});
