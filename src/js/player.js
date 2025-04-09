// Initialize the music player if not created
import {getSongAudioUrl} from "./common";

export function initializePlayer() {
    CreatePlayerElement();
    SetPlayerFromLocalStorage();
}

export function playTrack(songs, songIndex) {
    const player = GetPlayerElement();
    if (player) {
        document.querySelectorAll(".song-list-item").forEach((item) => item.classList.remove("playing"));
        const currentItem = document.querySelector(`.song-list-item[data-index="${songIndex}"]`);
        if (currentItem) currentItem.classList.add("playing");

        const songTitle = songs[songIndex].Title || "Untitled Track";
        SetPlayingTitle(songTitle);

        const audioUrl = getSongAudioUrl(songs[songIndex].SongID);
        PlaySong(audioUrl);

        // Save the current song and its progress to local storage
        localStorage.setItem('songTitle', songTitle);
        localStorage.setItem('currentSong', audioUrl);
        player.addEventListener("timeupdate", function () {
            localStorage.setItem('songProgress', player.currentTime);
        });

        PlayNextSong(songs, songIndex);
    }
}

function GetPlayerElement() {
    return document.getElementById("music-player");
}

function PlaySong(audioUrl) {
    const player = GetPlayerElement();
    player.src = audioUrl;
    player.play();
}

function PlayNextSong(songs, songIndex) {
    const player = document.getElementById("music-player");
    player.addEventListener("ended", function () {
        const next = songIndex + 1;
        if (next < songs.length) {
            playTrack(songs, next);
        } else {
            playTrack(songs, 0); // loop
        }
    }, {once: true});
}

function SetPlayingTitle(songTitle) {
    document.getElementById("song-title").innerText = `${songTitle}`;
}

function CreatePlayerElement() {
    if (!document.getElementById("music-player-container")) {
        const playerContainer = document.createElement("div");
        playerContainer.innerHTML = audioPlayerHtml;
        document.body.appendChild(playerContainer);
    }
}


function SetPlayerFromLocalStorage() {
    const player = document.getElementById("music-player");
    const currentSong = localStorage.getItem('currentSong');
    const songProgress = localStorage.getItem('songProgress');
    const songTitle = localStorage.getItem('songTitle');
    if (currentSong && songProgress && songTitle) {
        player.src = currentSong;
        player.currentTime = songProgress;
        player.volume = 0.5;
        SetPlayingTitle(songTitle);
    }
}

const audioPlayerHtml = `
  <div id="music-player-container" class="bg-black bg-opacity-50 p-2">
    <h2 class="display-4 text-white text-center fw-bold mb-2" id="current-song-title">
        Now Playing: 
        <span id="song-title">
        
        </span>
    </h2>
    <audio id="music-player" class="w-100" controls>
      <source src="" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </div>
`;