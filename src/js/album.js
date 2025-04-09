import './common.js';
import {apiEndpoint, getAlbumImageUrl, getArtistImageUrl, getSongImageUrl, placeholderImg} from "./common";
import {playTrack} from "./player";

document.addEventListener("DOMContentLoaded", () => {
    const albumId = getAlbumId();
    if (!albumId) return;

    Promise.all([fetchAlbumDetails(albumId), fetchSongs(albumId)]).catch(handleError);
});

function getAlbumId() {
    const albumId = parseInt(new URLSearchParams(window.location.search).get("AlbumID"), 10);
    if (isNaN(albumId)) showError("Missing or invalid AlbumID.");
    return isNaN(albumId) ? null : albumId;
}

function fetchAlbumDetails(albumId) {
    return fetch(`${apiEndpoint}/album?AlbumID=${albumId}`)
        .then(handleResponse)
        .then(async album => {
            await updateAlbumInfo(album);
            document.title = album.Title || "MusicStream";
        })
        .catch(handleError);
}

function fetchSongs(albumId) {
    return fetch(`${apiEndpoint}/songs?AlbumID=${albumId}`)
        .then(handleResponse)
        .then(songs => {
            renderTracks(songs);
            document.getElementById("play-album-button").addEventListener("click", () => playTrack(songs, 0));
        })
        .catch(handleError);
}

function fetchArtistDetails(artistID) {
    return fetch(`${apiEndpoint}/artists?ArtistID=${artistID}`)
        .then(handleResponse)
        .then(artists => {
            const artist = artists.find(a => a.ArtistID === artistID) || {};
            const artistName = artist.Name || "Unknown Artist";
            document.getElementById("artist-name").textContent = `By ${artistName}`;
            document.getElementById("artist-image").src = getArtistImageUrl(artist.ArtistID) || placeholderImg;
        })
        .catch(() => {
            document.getElementById("artist-name").textContent = "By Unknown Artist";
            document.getElementById("artist-image").src = placeholderImg;
        });
}


async function updateAlbumInfo(album) {
    if (!album) return showError("Album data missing");

    document.getElementById("album-title").textContent = album.Title || "Unknown Album";
    document.getElementById("album-year").textContent = `Year: ${album.ReleaseYear || "Unknown"}`;
    document.getElementById("album-artwork").src = getAlbumImageUrl(album.AlbumID) || placeholderImg;

    await fetchArtistDetails(album.ArtistID);
}

function renderTracks(songs) {
    const container = document.getElementById("songs-list");
    if (!songs.length) return container.innerHTML = `<div class="alert alert-info">No tracks available</div>`;

    container.innerHTML = songs.map((song, index) => `
        <div class="song-list-item list-group-item" data-index="${index}">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <img src="${getSongImageUrl(song.SongID) || placeholderImg}" alt="Song Image" class="song-image me-3">
                    <div>
                        <h5 class="mb-1">${index + 1}. ${song.Title || "Untitled Track"}</h5>
                        <small class="text-muted">${formatDuration(song.Duration)}</small>
                    </div>
                </div>
                <button class="btn btn-sm btn-primary play-button">▶</button>
            </div>
        </div>
    `).join("");

    // Event delegation for play buttons
    container.addEventListener('click', event => {
        const button = event.target.closest('.play-button');
        if (!button) return;
        const index = parseInt(button.closest('.song-list-item').dataset.index, 10);
        playTrack(songs, index);
    });
}

function formatDuration(seconds) {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
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
