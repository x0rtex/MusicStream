document.addEventListener("DOMContentLoaded", () => {
    // Fetch songs
    fetch('https://0lb1o3drhc.execute-api.us-east-1.amazonaws.com/dev/artists')
      .then(response => response.json())
      .then(data => {
        document.getElementById('artists').innerHTML = data.map(artist => `
          <div class="artist card">
            <div class="card-body">
              <img src="${artist.ImageURL || 'https://placehold.co/400x400'}" alt="${artist.Name}" width="150" height="150">
              <h3 style="word-wrap: break-word;">${artist.Name}</h3>
            </div>
          </div>
        `).join('');
      })

    // Featured album elements
    const featuredAlbumContainer = document.getElementById('featured-album');
    const featuredAlbumImage = featuredAlbumContainer.querySelector('.featured-album-img');
    const featuredAlbumTitle = featuredAlbumContainer.querySelector('.card-title');

    // Fetch featured album
    fetch('https://0lb1o3drhc.execute-api.us-east-1.amazonaws.com/dev/random-album')
      .then(response => response.json())
      .then(({ ImageURL, Title }) => {
        featuredAlbumImage.src = ImageURL || 'https://placehold.co/400x400';
        featuredAlbumTitle.textContent = Title;
      })
});

// Play song
function playSong(url) {
  const player = document.getElementById("player");
  player.src = url;
  player.play();
}
