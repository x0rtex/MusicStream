import './common.js';

import {
  CognitoUserPool,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

// Configure Cognito User Pool
const poolData = {
  UserPoolId: "us-east-1_ghxH0sYkF", // Replace with your User Pool ID
  ClientId: "4d7at7d1p1nv8hd6193v546o5r", // Replace with your App Client ID
};
const userPool = new CognitoUserPool(poolData);

// Function to register a new user
function registerUser(username, password, email) {
  // Define user attributes (e.g., email)
  const attributeList = [
    new CognitoUserAttribute({
      Name: "email", // Attribute name
      Value: email, // Attribute value
    }),
  ];

  // Call Cognito's signUp method to register the user
  userPool.signUp(username, password, attributeList, null, (err, result) => {
    if (err) {
      // Log error if registration fails
      console.error(
        "Error during registration:",
        err.message || JSON.stringify(err)
      );
      alert(`Registration failed: ${err.message}`);
      return;
    }
    // Log success message and redirect to login page
    console.log("User registered successfully:", result.user.getUsername());
    alert("Registration successful! Redirecting to login page...");
    window.location.href = "/login.html"; // Redirect to login page
  });
}

// Example usage (replace with actual form handling)
const username = "exampleUser"; // Replace with the desired username
const password = "ExamplePassword123!"; // Replace with a secure password
const email = "example@example.com"; // Replace with the user's email

// Call the registerUser function
registerUser(username, password, email);
