import { CognitoUserPool } from "amazon-cognito-identity-js";

// Import the AWS SDK and configure Cognito

// Configure Cognito User Pool
const poolData = {
  UserPoolId: "us-east-1_ghxH0sYkF",
  ClientId: "4d7at7d1p1nv8hd6193v546o5r",
};
const userPool = new CognitoUserPool(poolData);

// Function to register a new user
function registerUser(username, password, email) {
  const attributeList = [
    {
      Name: "email",
      Value: email,
    },
  ];

  userPool.signUp(username, password, attributeList, null, (err, result) => {
    if (err) {
      console.error(
        "Error during registration:",
        err.message || JSON.stringify(err)
      );
      return;
    }
    console.log("User registered successfully:", result.user.getUsername());
  });
}

// Example usage
const username = "exampleUser";
const password = "ExamplePassword123!";
const email = "example@example.com";

registerUser(username, password, email);
