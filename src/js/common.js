// Test comment

import "../css/styles.css";
import {CognitoUserPool} from "amazon-cognito-identity-js";

document.addEventListener("DOMContentLoaded", () => {
    createNavbar(); // Build navbar on load
    initializePlayer(); // Initialize music player
});

var poolData = {
    UserPoolId: process.env.VITE_COGNITO_USER_POOL_ID,
    ClientId: process.env.VITE_COGNITO_APP_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

const websiteUrl = process.env.WEBSITE_URL;
const loginUrl = process.env.LOGIN_URL;
const registerURL = process.env.REGISTER_URL;
const logoutURL = process.env.LOGOUT_URL;
export const apiEndpoint = process.env.API_ENDPOINT;
export const placeholderImg = "https://placehold.co/600x600?text=No+Image";

// Create navbar based on user's session status
function createNavbar() {
    const navContainer = document.getElementById("nav-container");
    const user = userPool.getCurrentUser();

    if (user) {
        user.getSession((err, session) => {
            if (err || !session.isValid()) {
                navContainer.innerHTML = getNavbarLoggedOut();
            } else {
                navContainer.innerHTML = getNavbarLoggedIn();
                addLogoutListener();
            }
        });
    } else {
        navContainer.innerHTML = getNavbarLoggedOut();
    }
}

// Attach logout click listener
function addLogoutListener() {
    const logoutBtn = document.getElementById("logout-link");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const user = userPool.getCurrentUser();
            if (user) {
                user.signOut();
                console.log("User logged out.");
                window.location.href = loginUrl;
            }
        });
    }
}

// Navbar for logged-in users (NO Login/Register)
function getNavbarLoggedIn() {
    return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="index.html">MusicStream</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="profile.html">Profile</a></li>
            <li class="nav-item"><a class="nav-link" href="checkout.html">Checkout</a></li>
            <li class="nav-item"><a class="nav-link" href="#" id="logout-link">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  `;
}

// Navbar for logged-out users (shows Login/Register)
function getNavbarLoggedOut() {
    return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="index.html">MusicStream</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="${registerURL}">Register</a></li>
            <li class="nav-item"><a class="nav-link" href="${loginUrl}">Login</a></li>
          </ul>
        </div>
      </div>
    </nav>
  `;
}

// Initialize the music player if not created
function initializePlayer() {
    if (!document.getElementById("music-player-container")) {
        const playerContainer = document.createElement("div");
        playerContainer.innerHTML = `
      <div id="music-player-container" class="bg-black bg-opacity-25 p-2">
        <audio id="music-player" class="w-100" controls>
          <source src="" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </div>
    `;
        document.body.appendChild(playerContainer);
    }
}

// Helper functions for media URLs
export function getArtistImageUrl(artistId) {
    return `${websiteUrl}/media/images/artists/${artistId}.webp`;
}

export function getAlbumImageUrl(albumId) {
    return `${websiteUrl}/media/images/albums/${albumId}.webp`;
}

export function getSongImageUrl(songId) {
    return `${websiteUrl}/media/images/songs/${songId}.webp`;
}

export function getSongAudioUrl(songId) {
    return `${websiteUrl}/media/audio/songs/${songId}.mp3`;
}
