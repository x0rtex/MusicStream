// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Get the ArtistID from the URL query parameters (either 'ArtistID' or 'id')
  const params = new URLSearchParams(window.location.search);
  const artistID = params.get("ArtistID") || params.get("id");

  // If ArtistID is missing, show an error message
  if (!artistID) {
    document.body.innerHTML = "<h1>Error: Missing ArtistID in URL</h1>";
    return;
  }

  // Fetch artist data by getting all artists and filtering by ArtistID
  fetch(`${apiEndpoint}/artists`)
    .then((response) => response.json())
    .then((artists) => {
      // Find the artist with the matching ArtistID
      const artist = artists.find((a) => a.ArtistID === artistID);
      if (artist) {
        // Update the artist header with the artist's name and image
        document.getElementById("artist-name").textContent = artist.Name;
        document.getElementById("artist-image").src =
          getArtistImageUrl(artist.ArtistID) || placeholderImg;
      } else {
        document.getElementById("artist-name").textContent = "Artist not found";
      }
    })
    .catch((error) => console.error("Error fetching artist data:", error));

  // Fetch albums for the given artist using the ArtistID query parameter
  fetch(`${apiEndpoint}/albums?ArtistID=${artistID}`)
    .then((response) => response.json())
    .then((albums) => {
      const albumsContainer = document.getElementById("albums");

      // If no albums are found, display a message
      if (!albums || albums.length === 0) {
        albumsContainer.innerHTML = "<p>No albums found for this artist.</p>";
        return;
      }

      // Populate the albums section with album cards
      albumsContainer.innerHTML = albums
        .map(
          (album) => `
        <div class="col-md-4">
          <div class="album-card card h-100">
            <img src="${
              getAlbumImageUrl(album.AlbumID) || placeholderImg
            }" class="card-img-top" alt="${album.Title}">
            <div class="card-body text-center">
              <h5 class="card-title">
                <a href="album.html?AlbumID=${album.AlbumID}&ArtistID=${album.ArtistID}" 
                   class="stretched-link text-decoration-none">
                  ${album.Title}
                </a>
              </h5>
              <p class="text-muted">Released: ${
                album.ReleaseYear || "Unknown"
              }</p>
            </div>
          </div>
        </div>
      `
        )
        .join("");
    })
    .catch((error) =>
      console.error("Error fetching albums for artist:", error)
    );
});
