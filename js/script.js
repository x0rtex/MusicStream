document.addEventListener("DOMContentLoaded", () => {
    // Get the container element for the artist cards
    const artistContainer = document.getElementById('artists');

    // Get the container element for the featured album
    const featuredAlbumContainer = document.getElementById('featured-album');

    // Get the elements to update
    const featuredAlbumImage = featuredAlbumContainer.querySelector('.featured-album-img');
    const featuredAlbumTitle = featuredAlbumContainer.querySelector('.card-title');

    // Make a GET request to your API endpoint
    fetch('https://0lb1o3drhc.execute-api.us-east-1.amazonaws.com/dev/artists')
        .then(response => response.json())
        .then(data => {
            // Loop through the received data and create artist cards
            data.forEach(artist => {
                const artistCard = document.createElement('div');
                artistCard.className = 'artist card';

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                const artistImage = document.createElement('img');
                artistImage.src = artist.ImageURL || 'https://placehold.co/400x400'; // Use the ImageURL from the API data
                artistImage.alt = artist.Name;
                artistImage.width = 150;
                artistImage.height = 150;

                const artistName = document.createElement('h3');
                artistName.textContent = artist.Name;

                cardBody.appendChild(artistImage);
                cardBody.appendChild(artistName);
                artistCard.appendChild(cardBody);

                artistContainer.appendChild(artistCard);
            });
        })
        .catch(error => console.error('Error fetching artist data:', error));

    // Make a GET request to your API endpoint for a random album
    fetch('https://0lb1o3drhc.execute-api.us-east-1.amazonaws.com/dev/random-album')
        .then(response => response.json())
        .then(data => {
            // Update the featured album section
            featuredAlbumImage.src = data.ImageURL || 'https://placehold.co/400x400'; // Update the image source
            featuredAlbumTitle.textContent = data.Title; // Update the title
        })
        .catch(error => console.error('Error fetching random album data:', error));
});

// Přehrávač hudby
function playSong(url) {
  const player = document.getElementById("player");
  player.src = url;
  player.play();
}
