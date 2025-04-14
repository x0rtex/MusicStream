import './common.js';
import {apiEndpoint, getAlbumImageUrl, getArtistImageUrl, placeholderImg} from "./common";

document.addEventListener("DOMContentLoaded", initializeHome);

function initializeHome() {
    fetchDisplayArtists();
    fetchDisplayFeaturedAlbum();
}

function fetchDisplayArtists() {
    fetch(`${apiEndpoint}/artists`)
        .then((response) => response.json())
        .then((artists) => {
            document.getElementById("artists").innerHTML = artists
                .map((artist) => `
                    <div class="col-md-3">
                      <div class="artist-card card h-100 fade-in-up">
                        <img src="${getArtistImageUrl(artist.ArtistID) || placeholderImg}" 
                             class="card-img-top" 
                             alt="${artist.Name}">
                        <div class="card-body text-center">
                          <h5 class="card-title">
                            <a href="artist.html?ArtistID=${artist.ArtistID}" 
                                class="stretched-link text-decoration-none gradient-text">
                                ${artist.Name}
                            </a>
                          </h5>
                          <p class="text-muted">${artist.Genre || ""}</p>
                        </div>
                      </div>
                    </div>`
                ).join("");
        });
}

function fetchDisplayFeaturedAlbum() {
    fetch(`${apiEndpoint}/album`)
        .then((response) => response.json())
        .then((album) => {
            document.getElementById("featured-album-title")
                .textContent = album.Title;
            document.getElementById("featured-album-link")
                .href = `album.html?AlbumID=${album.AlbumID}&ArtistID=${album.ArtistID}`;
            document.querySelector(".featured-album-img")
                .src = getAlbumImageUrl(album.AlbumID) || placeholderImg;
        });
}
