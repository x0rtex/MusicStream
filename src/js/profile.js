import "./common.js";
import { getCurrentUser } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser();

  if (!user) {
    window.location.href = process.env.LOGIN_URL;
    return;
  }

  user.getSession((err, session) => {
    if (err || !session.isValid()) {
      window.location.href = process.env.LOGIN_URL;
      return;
    }

    document.querySelector(".profile-container").innerHTML = `
      <h1 class="display-4 mb-4">User Profile</h1>
      <div class="profile-card shadow-lg p-4 rounded">
        <img alt="User Profile Picture" class="rounded-circle mb-3" height="150" src="https://placehold.co/400x400" width="150"/>
        <p><strong>Name:</strong> ${user.getUsername()}</p>
        <p><strong>Email:</strong> ${
          user.getAttributes()["email"] || "Not available"
        }</p>
      </div>
    `;
  });
});
