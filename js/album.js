document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const albumId = params.get("AlbumID");
  const artistId = params.get("ArtistID");

  // Log the parameters to make sure they are being parsed correctly
  console.log("AlbumID:", albumId, "ArtistID:", artistId);

  if (!albumId || !artistId) {
    showError("Missing album or artist information");
    return;
  }

  // Fetch album details
  fetch(`${apiEndpoint}/albums?AlbumID=${albumId}&ArtistID=${artistId}`)
    .then(handleResponse)
    .then((albums) => {
      console.log("Album data received:", albums); // Log the album array
      // Use the first album in the array if multiple are returned
      updateAlbumInfo(albums[0]);
    })
    .catch(handleError);

  // Fetch songs
  fetch(`${apiEndpoint}/songs?AlbumID=${albumId}`)
    .then(handleResponse)
    .then((data) => renderTracks(data.Songs || []))
    .catch(handleError);
});

function updateAlbumInfo(album) {
  if (!album || typeof album !== "object") {
    showError("Album data is malformed or missing.");
    return;
  }

  // Get album details or use "Unknown" values if missing
  const albumTitle = album.Title || "Unknown Album Title";
  const releaseYear = album.ReleaseYear || "Unknown";
  const imageURL =
    album.ImageURL || "https://placehold.co/600x600?text=No+Image"; // Ensure fallback image

  // Update DOM with the album details (excluding artist name and genre)
  document.getElementById("album-title").textContent = albumTitle;
  document.getElementById("album-year").textContent = `Year: ${releaseYear}`;
  document.getElementById("album-artwork").src = imageURL;

  // Check if the values are being updated in the DOM
  console.log("Album info updated in DOM:", albumTitle, releaseYear, imageURL);
}

function renderTracks(songs) {
  const container = document.getElementById("songs-list");

  if (!songs.length) {
    container.innerHTML = `<div class="alert alert-info">No tracks available</div>`;
    return;
  }

  container.innerHTML = songs
    .map(
      (song, index) => `
      <div class="list-group-item">
          <div class="d-flex justify-content-between align-items-center">
              <div>
                  <h5 class="mb-1">${index + 1}. ${
        song.Title || "Untitled Track"
      }</h5>
                  <small class="text-muted">${formatDuration(
                    song.Duration
                  )}</small>
              </div>
              <button class="btn btn-sm btn-primary" 
                      onclick="playTrack('${song.SongURL}')">
                  Play
              </button>
          </div>
      </div>
  `
    )
    .join("");
}

function playTrack(url) {
  const player = document.getElementById("player");
  if (player) {
    player.src = url;
    player.play();
  }
}

function handleResponse(response) {
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

function handleError(error) {
  console.error("Error:", error);
  showError(`Failed to load data: ${error.message}`);
}

function showError(message) {
  document.body.innerHTML = `
      <div class="container mt-5">
          <div class="alert alert-danger">${message}</div>
          <a href="index.html" class="btn btn-primary">Back to Home</a>
      </div>
  `;
}

function formatDuration(seconds) {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
