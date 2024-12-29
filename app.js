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
document.getElementById("signUpForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form from submitting

  const email = document.getElementById("email-signup").value;
  const password = document.getElementById("password-signup").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Password confirmation check
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Send data to the server for sign-up
  try {
    const response = await fetch('https://itsm0oo.github.io/EasyBroker/', {  // Change URL to match your backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Account created successfully!");
      window.location.href = "sign-in.html"; // Redirect to Sign-In page after successful sign up
    } else {
      alert(data.message || "An error occurred. Please try again."); // Show error message
    }
  } catch (error) {
    console.error("Error during sign-up:", error);
    alert("An error occurred. Please try again later.");
  }
});

// Handling Sign In Form Submission
document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form from submitting

  const email = document.getElementById("email-signin").value;
  const password = document.getElementById("password-signin").value;

  // Send data to the server for sign-in
  try {
    const response = await fetch('https://itsm0oo.github.io/EasyBroker/', {  // Change URL to match your backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Sign In successful!");
      localStorage.setItem('token', data.token);  // Store JWT token in localStorage for session
      window.location.href = "dashboard.html"; // Redirect to dashboard after successful login
    } else {
      alert(data.message || "Invalid email or password.");  // Show error message
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    alert("An error occurred. Please try again later.");
  }
});
