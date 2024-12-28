const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

//2

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

//3

<div class="container">
    <div class="form-container sign-up-container">
        <form id="signUpForm">
            <h1>Sign Up</h1>
            <input type="email" id="email" placeholder="Enter your email" required />
            <input type="password" id="password" placeholder="Enter your password" required />
            <input type="password" id="confirmPassword" placeholder="Confirm your password" required />
            <button type="submit">Sign Up</button>
        </form>
    </div>
    
    <div class="form-container sign-in-container">
        <form id="loginForm">
            <h1>Sign In</h1>
            <input type="email" id="email" placeholder="Enter your email" required />
            <input type="password" id="password" placeholder="Enter your password" required />
            <button type="submit">Sign In</button>
        </form>
    </div>

    <div class="overlay-container">
        <div class="overlay">
            <div class="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us, please log in with your personal info</p>
                <button id="sign-in-btn" class="ghost">Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start your journey with us</p>
                <button id="sign-up-btn" class="ghost">Sign Up</button>
            </div>
        </div>
    </div>
</div>

