import './common.js';
import {apiEndpoint, getAlbumImageUrl, getArtistImageUrl, placeholderImg} from "./common";

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const artistIDStr = params.get("ArtistID") || params.get("id");

    if (!artistIDStr) {
        document.body.innerHTML = "<h1>Error: Missing ArtistID in URL</h1>";
        return;
    }

    const ArtistID = parseInt(artistIDStr, 10);
    if (isNaN(ArtistID)) {
        document.body.innerHTML = "<h1>Error: Invalid ArtistID</h1>";
        return;
    }

    fetch(`${apiEndpoint}/artist?ArtistID=${ArtistID}`)
        .then((response) => {
            if (!response.ok) throw new Error("Artist not found");
            return response.json();
        })
        .then((artist) => {
            const artistName = artist.Name;
            document.getElementById("artist-name").textContent = artistName;
            document.getElementById("artist-image").src =
                getArtistImageUrl(ArtistID) || placeholderImg;
            document.title = artistName || "MusicStream";
        })
        .catch((error) => {
            console.error("Error fetching artist data:", error);
            document.getElementById("artist-name").textContent = "Artist not found";
        });

    fetch(`${apiEndpoint}/albums?ArtistID=${ArtistID}`)
        .then((response) => response.json())
        .then((albums) => {
            const albumsContainer = document.getElementById("albums");

            if (!albums || albums.length === 0) {
                albumsContainer.innerHTML = "<p>No albums found for this artist.</p>";
                return;
            }

            albumsContainer.innerHTML = albums
                .map(
                    (album) => `
        <div class="col-md-4">
          <div class="album-card card h-100">
            <img src="${getAlbumImageUrl(album.AlbumID) || placeholderImg}" class="card-img-top" alt="${album.Title}">
            <div class="card-body text-center">
              <h5 class="card-title">
                <a href="album.html?AlbumID=${album.AlbumID}" 
                   class="stretched-link text-decoration-none">
                  ${album.Title}
                </a>
              </h5>
              <p class="text-muted">Released: ${album.ReleaseYear || "Unknown"}</p>
            </div>
          </div>
        </div>
      `)
                .join("");
        })
        .catch((error) =>
            console.error(`Error fetching albums for artist: ${error}`)
        );
});
