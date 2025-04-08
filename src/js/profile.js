import './common.js';

function checkLogin() {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        // If no token is found, redirect to the login page
        window.location.href = "/login.html";
    } else {
        console.log("User is logged in.");
        // Optionally, validate the token with the backend or Cognito
    }
}

document.addEventListener("DOMContentLoaded", checkLogin);
