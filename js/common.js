document.addEventListener("DOMContentLoaded", () => {
    createNavbar();
    initializePlayer();
});

const websiteUrl = "https://musicstreamcc.xyz";
const apiEndpoint = "https://api.musicstreamcc.xyz/";
const placeholderImg = "https://placehold.co/600x600?text=No+Image";

function createNavbar() {
    const navContainer = document.getElementById('nav-container');
    navContainer.innerHTML = `
      <!-- Relative URLs are intentional and will be resolved correctly in the rendered HTML -->
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

function getArtistImageUrl(artistId) {
    return `${websiteUrl}/media/images/artists/${artistId}.webp`;
}

function getAlbumImageUrl(albumId) {
    return `${websiteUrl}/media/images/albums/${albumId}.webp`;
}

function getSongImageUrl(songId) {
    return `${websiteUrl}/media/images/songs/${songId}.webp`;
}

function getSongAudioUrl(songId) {
    return `${websiteUrl}/media/audio/songs/${songId}.mp3`;
}
