// Selecting the sign-up and sign-in buttons
const signInBtn = document.querySelector("#sign-in-btn");
const signUpBtn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

// Adding event listeners to handle form switching
signUpBtn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

signInBtn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Handling Sign Up Form Submission
document.getElementById("signUpForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from submitting

  const email = document.getElementById("email-signup").value;
  const password = document.getElementById("password-signup").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Password confirmation check
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Get existing users from localStorage or initialize an empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the email already exists
  if (users.some((user) => user.email === email)) {
    alert("An account with this email already exists.");
    return;
  }

  // Save new user in localStorage
  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully!");
  window.location.href = "sign-in.html"; // Redirect to Sign-In page after successful sign up
});

// Handling Sign In Form Submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from submitting

  const email = document.getElementById("email-signin").value;
  const password = document.getElementById("password-signin").value;

  // Get users from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Find user with matching email and password
  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    alert("Sign In successful!");
    window.location.href = "dashboard.html"; // Redirect to dashboard after successful login
  } else {
    alert("Invalid email or password.");
  }
});
