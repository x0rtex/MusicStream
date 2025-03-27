document.addEventListener("DOMContentLoaded", () => {
  // Simulovaná data alb
  const albums = [
    {
      id: 1,
      title: "Album 1",
      artist: "Artist A",
      price: "$9.99",
      img: "album1.jpg",
    },
    {
      id: 2,
      title: "Album 2",
      artist: "Artist B",
      price: "$12.99",
      img: "album2.jpg",
    },
  ];

  const albumList = document.getElementById("album-list");

  // Vykreslení alb na domovské stránce
  albums.forEach((album) => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
          <div class="card mb-3">
              <img src="${album.img}" class="card-img-top" alt="${album.title}">
              <div class="card-body">
                  <h5 class="card-title">${album.title}</h5>
                  <p class="card-text">by ${album.artist}</p>
                  <p class="card-text"><strong>${album.price}</strong></p>
                  <a href="song.html?albumId=${album.id}" class="btn btn-primary">View Songs</a>
              </div>
          </div>
      `;
    albumList.appendChild(col);
  });

  // Přihlášení přes Cognito (zatím jen simulace)
  document.getElementById("loginBtn").addEventListener("click", () => {
    alert("Redirecting to Cognito login...");
  });
});

// Přehrávač hudby
function playSong(url) {
  const player = document.getElementById("player");
  player.src = url;
  player.play();
}
