document.getElementById("signUpForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email-signup").value;
    const password = document.getElementById("password-signup").value;

    fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
        .then(response => response.text())
        .then(message => alert(message))
        .catch(error => console.error("Error:", error));
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
        .then(response => {
            if (response.ok) {
                alert("Sign In successful!");
                window.location.href = "main.html"; // Redirect to dashboard
            } else {
                alert("Invalid email or password.");
            }
        })
        .catch(error => console.error("Error:", error));
});
