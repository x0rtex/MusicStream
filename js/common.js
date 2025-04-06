const apiEndpoint = "https://0lb1o3drhc.execute-api.us-east-1.amazonaws.com/dev";
const placeholderImg = "https://placehold.co/600x600?text=No+Image";

function formatDuration(seconds) {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function initializePlayer() {
  if (!document.getElementById("player")) {
    const playerContainer = document.createElement("div");
    playerContainer.innerHTML = `
      <div class="fixed-player bg-white p-3" style="position: fixed; bottom: 0; left: 0; right: 0; z-index: 1000;">
        <audio id="player" controls class="w-100">
          <source src="" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </div>
    `;
    document.body.appendChild(playerContainer);
  }
}

function getArtistImageUrl(artistId) {
  return `https://music-stream-cc.s3.us-east-1.amazonaws.com/media/images/artists/${artistId}.webp`;
}

function getAlbumImageUrl(albumId) {
  return `https://music-stream-cc.s3.us-east-1.amazonaws.com/media/images/albums/${albumId}.webp`;
}

function getSongImageUrl(songId) {
  return `https://music-stream-cc.s3.us-east-1.amazonaws.com/media/images/songs/${songId}.webp`;
}

function getSongAudioUrl(songId) {
  return `https://music-stream-cc.s3.us-east-1.amazonaws.com/media/audio/songs/${songId}.mp3`;
}

// Add audio player to every page
document.addEventListener("DOMContentLoaded", () => {
  initializePlayer();
});
