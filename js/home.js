document.addEventListener("DOMContentLoaded", () => {
  // Fetch and display artists
  fetch(`${apiEndpoint}/artists`)
    .then((response) => response.json())
    .then((artists) => {
      const container = document.getElementById("artists");
      container.innerHTML = artists
        .map(
          (artist) => `
              <div class="col-md-3">
                  <div class="artist-card card h-100">
                      <img src="${artist.ImageURL || placeholderImg}" 
                           class="card-img-top" 
                           alt="${artist.Name}">
                      <div class="card-body text-center">
                          <h5 class="card-title">
                              <a href="artist.html?ArtistID=${artist.ArtistID}" 
                                 class="stretched-link text-decoration-none">
                                  ${artist.Name}
                              </a>
                          </h5>
                          <p class="text-muted">${artist.Genre || ""}</p>
                      </div>
                  </div>
              </div>
          `
        )
        .join("");
    });

  // Fetch featured album
  fetch(`${apiEndpoint}/random-album`)
    .then((response) => response.json())
    .then((album) => {
      document.getElementById("featured-album-title").textContent = album.Title;
      document.getElementById(
        "featured-album-link"
      ).href = `album.html?AlbumID=${album.AlbumID}&ArtistID=${album.ArtistID}`;
      document.querySelector(".featured-album-img").src =
        album.ImageURL || placeholderImg;
    });
});
