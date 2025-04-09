import {getSongAudioUrl} from "./common";

export function initializePlayer() {
    createPlayerElement();
    setPlayerFromLocalStorage();
}

export function playTrack(songs, songIndex) {
    const player = getPlayerElement();
    if (!player) return;

    document.querySelectorAll(".song-list-item").forEach(item => item.classList.remove("playing"));
    const currentItem = document.querySelector(`.song-list-item[data-index="${songIndex}"]`);
    currentItem?.classList.add("playing");

    const songTitle = songs[songIndex].Title || "Untitled Track";
    setPlayingTitle(songTitle);

    const audioUrl = getSongAudioUrl(songs[songIndex].SongID);
    playSong(audioUrl);

    // Save current song and title
    localStorage.setItem('currentSong', audioUrl);
    localStorage.setItem('songTitle', songTitle);

    setupNextSong(songs, songIndex);
}

function getPlayerElement() {
    return document.getElementById("music-player");
}

function playSong(audioUrl) {
    const player = getPlayerElement();
    player.src = audioUrl;
    player.play();
}

function setupNextSong(songs, songIndex) {
    const player = getPlayerElement();
    player.addEventListener("ended", () => {
        const nextIndex = songIndex + 1 < songs.length ? songIndex + 1 : 0;
        playTrack(songs, nextIndex);
    }, {once: true});
}

function setPlayingTitle(songTitle) {
    document.getElementById("song-title").textContent = songTitle;
}

function createPlayerElement() {
    if (!document.getElementById("music-player-container")) {
        const container = document.createElement("div");
        container.innerHTML = audioPlayerHtml;
        document.body.appendChild(container);

        // Setup persistent timeupdate listener
        const player = getPlayerElement();
        player.addEventListener("timeupdate", () => {
            localStorage.setItem('songProgress', player.currentTime);
        });
    }
}

function setPlayerFromLocalStorage() {
    const player = getPlayerElement();
    const currentSong = localStorage.getItem('currentSong');
    const songProgress = localStorage.getItem('songProgress');
    const songTitle = localStorage.getItem('songTitle');

    if (currentSong) {
        player.src = currentSong;
        player.volume = 0.5;
        player.currentTime = parseFloat(songProgress) || 0;

        if (songTitle) {
            setPlayingTitle(songTitle);
        }
    }
}

const audioPlayerHtml = `
  <div id="music-player-container" class="bg-dark p-2">
    <h2 class="display-4 text-white text-center fw-bold mb-2" id="current-song-title">
        Now Playing: 
        <span id="song-title"></span>
    </h2>
    <audio id="music-player" class="w-100" controls>
      <source src="" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </div>
`;