import "../css/styles.css";
import {CognitoUserPool} from "amazon-cognito-identity-js";
import {initializePlayer} from "./player";

document.addEventListener("DOMContentLoaded", () => {
    createNavbar(); // Build navbar on load
    createFooter(); // Build footer on load
    initializePlayer(); // Initialize music player
});

const poolData = {
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

export function createFooter() {
    const footerContainer = document.getElementById("footer-container");

    const footerHTML = `
        <footer id="footer" class="bg-dark text-white mt-5">
            <div class="container py-5">
                <div class="row">
                    <div class="col-md-4 mb-4">
                        <h5>MusicStream</h5>
                        <p class="text-muted">Your favorite music streaming platform.</p>
                        <p class="text-muted">&copy; ${new Date().getFullYear()} MusicStream</p>
                    </div>
                    <div class="col-md-2 mb-4">
                        <h5>Quick Links</h5>
                        <ul class="list-unstyled">
                            <li><a href="index.html" class="text-white text-decoration-none">Home</a></li>
                            <li><a href="#" class="text-white text-decoration-none">About</a></li>
                            <li><a href="#" class="text-white text-decoration-none">Contact</a></li>
                        </ul>
                    </div>
                    <div class="col-md-3 mb-4">
                        <h5>Legal</h5>
                        <ul class="list-unstyled">
                            <li><a href="#" class="text-white text-decoration-none">Privacy Policy</a></li>
                            <li><a href="#" class="text-white text-decoration-none">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div class="col-md-3 mb-4">
                        <h5>Follow Us</h5>
                        <div class="social-links">
                            <a href="#" class="text-white me-2" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                            <a href="#" class="text-white me-2" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="#" class="text-white me-2" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="text-white" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    `;

    if (footerContainer) {
        footerContainer.innerHTML = footerHTML;
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
