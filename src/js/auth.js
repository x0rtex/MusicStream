import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: process.env.VITE_COGNITO_USER_POOL_ID,
  ClientId: process.env.VITE_COGNITO_APP_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

export function getCurrentUser() {
  return userPool.getCurrentUser();
}

export function logout() {
  const user = getCurrentUser();
  if (user) {
    user.signOut();
    console.log("User logged out");
  }
}

console.log("UserPoolId:", process.env.VITE_COGNITO_USER_POOL_ID);
console.log("ClientId:", process.env.VITE_COGNITO_APP_CLIENT_ID);
