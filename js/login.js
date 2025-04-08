import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

// Configure Cognito User Pool
const poolData = {
  UserPoolId: "us-east-1_ghxH0sYkF", // Replace with your User Pool ID
  ClientId: "4d7at7d1p1nv8hd6193v546o5r", // Replace with your App Client ID
};
const userPool = new CognitoUserPool(poolData);

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
      alert("Please fill in both fields.");
      return;
    }

    // Authenticate user using Cognito
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log("Login successful!");

        // Store tokens in localStorage
        const accessToken = result.getAccessToken().getJwtToken();
        const idToken = result.getIdToken().getJwtToken();
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("idToken", idToken);

        // Redirect to profile page
        window.location.href = "/profile.html";
      },
      onFailure: (err) => {
        console.error("Login failed:", err.message || JSON.stringify(err));
        alert(`Login failed: ${err.message}`);
      },
    });
  });
});
