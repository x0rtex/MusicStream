// Function to log out the user
function logoutUser() {
  // Remove tokens from localStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("idToken");

  // Redirect to the login page
  window.location.href = "/login.html";
}

// Add event listener to the logout button
document.getElementById("logoutButton").addEventListener("click", logoutUser);
