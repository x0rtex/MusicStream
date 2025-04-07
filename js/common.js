const websiteUrl = "https://musicstreamcc.xyz";
const apiEndpoint = "https://api.musicstreamcc.xyz/";
const placeholderImg = "https://placehold.co/600x600?text=No+Image";

function formatDuration(seconds) {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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

// Add audio player to every page
document.addEventListener("DOMContentLoaded", () => {
    initializePlayer();
});
