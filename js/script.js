const apiEndpoint = 'https://0lb1o3drhc.execute-api.us-east-1.amazonaws.com/dev';
const placeholderImg = "https://placehold.co/400x400";

// Function to fetch artists
function fetchArtists() {
  fetch(`${apiEndpoint}/artists`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('artists').innerHTML = data.map(artist => `
        <div class="artist card">
          <div class="card-body">
            <img src="${artist.ImageURL || placeholderImg}" alt="${artist.Name}" width="150" height="150">
            <h3 style="word-wrap: break-word;">
              <a href="artist.html?id=${artist.id}">${artist.Name}</a>
            </h3>          
          </div>
        </div>
      `).join('');
    });
}

// Function to fetch featured album
function fetchFeaturedAlbum() {
    fetch(`${apiEndpoint}/random-album`)
    
    .then(response => response.json())
    .then(({ ImageURL, Title }) => {
      const featuredAlbumContainer = document.getElementById('featured-album');
      const featuredAlbumImage = featuredAlbumContainer.querySelector('.featured-album-img');
      const featuredAlbumTitle = featuredAlbumContainer.querySelector('.card-title');
      featuredAlbumImage.src = ImageURL || placeholderImg;
      featuredAlbumTitle.textContent = Title;
    });
}

// Play song
function playSong(url) {
  const player = document.getElementById("player");
  player.src = url;
  player.play();
}

document.addEventListener("DOMContentLoaded", () => {
  fetchArtists();
  fetchFeaturedAlbum();
});