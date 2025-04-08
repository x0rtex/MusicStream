function logoutUser() {
  // Remove tokens from localStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("idToken");

  // Redirect to the login page
  window.location.href = "/login.html";
}

document.getElementById("logoutButton").addEventListener("click", logoutUser);
