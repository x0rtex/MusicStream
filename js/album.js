document.addEventListener("DOMContentLoaded", () => {
    const albumId = getAlbumId();
    if (!albumId) return;

    Promise.all([fetchAlbumDetails(albumId), fetchSongs(albumId)])
        .then(() => {
        })
        .catch(handleError);
});

function getAlbumId() {
    const params = new URLSearchParams(window.location.search);
    const albumId = parseInt(params.get("AlbumID"), 10);

    if (isNaN(albumId)) {
        showError("Missing or invalid AlbumID.");
        return null;
    }

    return albumId;
}

function fetchAlbumDetails(albumId) {
    return fetch(`${apiEndpoint}/album?AlbumID=${albumId}`)
        .then(handleResponse)
        .then((album) => {
            updateAlbumInfo(album);
            document.title = album.Title || "MusicStream";
        })
        .catch(handleError);
}

function fetchSongs(albumId) {
    return fetch(`${apiEndpoint}/songs?AlbumID=${albumId}`)
        .then(handleResponse)
        .then((songs) => {
            const playlist = songs.map((song) => getSongAudioUrl(song.SongID));
            renderTracks(songs, playlist);

            document.getElementById("play-album-button").addEventListener("click", () => {
                playTrack(playlist, 0);
            });
        })
        .catch(handleError);
}

function fetchArtistDetails(artistID) {
    return fetch(`${apiEndpoint}/artists?ArtistID=${artistID}`)
        .then((response) => response.json())
        .then((artists) => {
            const artist = artists.find((a) => a.ArtistID === artistID);
            const artistName = artist.Name || "Unknown Artist";
            const artistImageUrl = getArtistImageUrl(artist.ArtistID) || placeholderImg;
            document.getElementById("artist-name").textContent = `By ${artistName || "Unknown Artist"}`;
            document.getElementById("artist-image").src = artistImageUrl;
        })
        .catch((error) => {
            console.error("Error fetching artist data:", error);
            document.getElementById("artist-name").textContent = "By Unknown Artist";
        });
}

async function updateAlbumInfo(album) {
    if (!album || typeof album !== "object") {
        showError("Album data is malformed or missing.");
        return;
    }

    const albumTitle = album.Title || "Unknown Album Title";
    const releaseYear = album.ReleaseYear || "Unknown Release Year";
    const imageURL = getAlbumImageUrl(album.AlbumID) || "https://placehold.co/600x600?text=No+Image";
    const artistID = album.ArtistID;

    document.getElementById("album-title").textContent = albumTitle;
    document.getElementById("album-year").textContent = `Year: ${releaseYear}`;
    document.getElementById("album-artwork").src = imageURL;
    
    await fetchArtistDetails(artistID);
}

function renderTracks(songs, playlist) {
    const container = document.getElementById("songs-list");

    if (!songs.length) {
        container.innerHTML = `<div class="alert alert-info">No tracks available</div>`;
        return;
    }

    container.innerHTML = songs.map((song, index) => `
      <div class="song-list-item list-group-item" data-index="${index}">
          <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                  <img src="${getSongImageUrl(song.SongID)}" alt="Song Image" class="song-image me-3">
                  <div>
                      <h5 class="mb-1">${index + 1}. ${song.Title || "Untitled Track"}</h5>
                      <small class="text-muted">${formatDuration(song.Duration)}</small>
                  </div>
              </div>
              <button class="btn btn-sm btn-primary play-button">▶</button>
          </div>
      </div>
  `).join("");

    const playButtons = container.querySelectorAll('.play-button');
    playButtons.forEach((button, index) => {
        button.addEventListener('click', () => playTrack(playlist, index));
    });
}

function formatDuration(seconds) {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function playTrack(playlist, songIndex) {
    const player = document.getElementById("music-player");
    if (player) {
        document.querySelectorAll(".song-list-item").forEach((item) => item.classList.remove("playing"));
        const currentItem = document.querySelector(`.song-list-item[data-index="${songIndex}"]`);
        if (currentItem) currentItem.classList.add("playing");

        player.src = playlist[songIndex];
        player.play();

        player.addEventListener("ended", function () {
            const next = songIndex + 1;
            if (next < playlist.length) {
                playTrack(playlist, next);
            } else {
                playTrack(playlist, 0); // loop
            }
        }, {once: true});
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

