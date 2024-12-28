const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

const signUpForm = document.getElementById("signUpForm");
signUpForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Get existing users from localStorage (or an empty array if none)
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email already exists
    if (users.some(user => user.email === email)) {
        alert("An account with this email already exists. Please log in.");
        return;
    }

    // Add the new user to the users array
    users.push({ email, password });

    // Save the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    
    // Redirect to sign-in page after successful sign-up
    window.location.href = "sign-in.html";
});

//sign in 

const signInForm = document.getElementById("loginForm");
signInForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the user that matches the entered email and password
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert("Sign In Successful!");
        // Redirect to a new page after successful login (e.g., dashboard.html)
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid email or password.");
    }
});

