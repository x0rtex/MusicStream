import '../css/styles.css'

document.addEventListener("DOMContentLoaded", () => {
    createNavbar();
    initializePlayer();
});

const websiteUrl = process.env.WEBSITE_URL;
export const apiEndpoint = process.env.API_ENDPOINT;
export const placeholderImg = "https://placehold.co/600x600?text=No+Image";

function createNavbar() {
    const navContainer = document.getElementById('nav-container');
    <!-- Relative URLs are intentional and will be resolved correctly in the rendered HTML -->
    // noinspection HtmlUnknownTarget
    navContainer.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand" href="index.html">MusicStream</a>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="index.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="profile.html">Profile</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="checkout.html">Checkout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      `;
}

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
