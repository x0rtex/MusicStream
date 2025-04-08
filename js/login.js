// login.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Login successful!");
        // Redirect or handle successful login
        window.location.href = "/dashboard";
      } else {
        const error = await response.json();
        alert(`Login failed: ${error.message}`);
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("An error occurred. Please try again later.");
    }
  });
});
