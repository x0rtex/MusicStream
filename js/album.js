document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const albumId = params.get("AlbumID");
    const artistId = params.get("ArtistID");

    if (!albumId || !artistId) {
        showError("Missing album or artist information.");
        return;
    }

    // Fetch album details
    fetch(`${apiEndpoint}/albums?AlbumID=${albumId}&ArtistID=${artistId}`)
        .then(handleResponse)
        .then((albums) => {
            updateAlbumInfo(albums[0]);
            document.title = albums[0].Title || "MusicStream";
        })
        .catch(handleError);

    // Fetch songs
    fetch(`${apiEndpoint}/songs?AlbumID=${albumId}`)
        .then(handleResponse)
        .then((data) => {
            const playlist = data.Songs.map((song) => getSongAudioUrl(song.SongID));
            renderTracks(data.Songs, playlist);

            document.getElementById("play-album-button").addEventListener("click", () => {
                playTrack(playlist, 0);
            });
        })
        .catch(handleError);
});

function updateAlbumInfo(album) {
    if (!album || typeof album !== "object") {
        showError("Album data is malformed or missing.");
        return;
    }

    // Get album details or use "Unknown" values if missing
    const albumTitle = album.Title || "Unknown Album Title";
    const releaseYear = album.ReleaseYear || "Unknown Release Year";
    const imageURL = getAlbumImageUrl(album.AlbumID) || "https://placehold.co/600x600?text=No+Image";
    const artistID = album.ArtistID;

    // Update DOM with the album details (excluding artist name and genre)
    document.getElementById("album-title").textContent = albumTitle;
    document.getElementById("album-year").textContent = `Year: ${releaseYear}`;
    document.getElementById("album-artwork").src = imageURL;

    fetch(`${apiEndpoint}/artists?ArtistID=${artistID}`)
        .then((response) => response.json())
        .then((artists) => {
            const artist = artists.find((a) => a.ArtistID === artistID);
            if (artist) {
                const artistName = artist.Name;
                const artistImageUrl = getArtistImageUrl(artist.ArtistID) || placeholderImg;

                // Update DOM with the album details (including artist name and image)
                document.getElementById("album-title").textContent = albumTitle;
                document.getElementById("album-year").textContent = `Year: ${releaseYear}`;
                document.getElementById("album-artwork").src = imageURL;
                document.getElementById("artist-name").textContent = `By ${artistName}`;
                document.getElementById("artist-image").src = artistImageUrl;
            }
        })
        .catch((error) => console.error("Error fetching artist data:", error));
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

function playTrack(playlist, songIndex) {
    const player = document.getElementById("music-player");
    if (player) {
        // Remove playing class from all song list items
        const songListItems = document.querySelectorAll(".song-list-item");
        songListItems.forEach((item) => item.classList.remove("playing"));

        // Add playing class to the current song list item
        const currentSongListItem = songListItems[songIndex];
        if (currentSongListItem) {
            currentSongListItem.classList.add("playing");
        }

        player.src = playlist[songIndex];
        player.play();
        player.addEventListener("ended", function () {
            // Play the next track in the playlist
            const nextTrackIndex = songIndex + 1;
            if (nextTrackIndex < playlist.length) {
                playTrack(playlist, nextTrackIndex);
            } else {
                playTrack(playlist, 0);
            }
        });
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
