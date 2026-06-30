const songs = [];

for (let i = 1; i <= 10; i++) {
    songs.push({
        title: `Song ${i}`,
        logo: `songs/${i}/logo.png`,
        cover: `songs/${i}/cover.jpg`,
        audio: `songs/${i}/song.mp3`
    });
}

const audio = document.getElementById("audio");
const logo = document.getElementById("logo");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const playlist = document.getElementById("playlist");
const playBtn = document.querySelector(".play");

let currentSong = 0;

// Load Song
function loadSong(index) {

    currentSong = index;

    audio.src = songs[index].audio;
    logo.src = songs[index].logo;
    cover.src = songs[index].cover;
    title.textContent = songs[index].title;

    audio.play();

    playBtn.innerHTML = "⏸";
    cover.classList.add("playing");

}

// Play / Pause
function playPause() {

    if (audio.paused) {

        audio.play();
        playBtn.innerHTML = "⏸";
        cover.classList.add("playing");

    } else {

        audio.pause();
        playBtn.innerHTML = "▶";
        cover.classList.remove("playing");

    }

}

// Next
function nextSong() {

    currentSong++;

    if (currentSong >= songs.length)
        currentSong = 0;

    loadSong(currentSong);

}

// Previous
function prevSong() {

    currentSong--;

    if (currentSong < 0)
        currentSong = songs.length - 1;

    loadSong(currentSong);

}

// Update Progress
audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    progress.value = (audio.currentTime / audio.duration) * 100;

    current.textContent = format(audio.currentTime);
    duration.textContent = format(audio.duration);

});

// Seek
progress.addEventListener("input", () => {

    if (!audio.duration) return;

    audio.currentTime = (progress.value / 100) * audio.duration;

});

// Auto Next
audio.addEventListener("ended", nextSong);

// Format Time
function format(sec) {

    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);

    return `${m}:${s < 10 ? "0" : ""}${s}`;

}

// Playlist Toggle
cover.onclick = () => {

    playlist.classList.toggle("active");

};

// Create Playlist
for (let i = 0; i < songs.length; i++) {

    playlist.innerHTML += `
        <div class="song" onclick="selectSong(${i})">
            <img src="${songs[i].cover}">
            <div class="song-name">${songs[i].title}</div>
        </div>
    `;

}

// Select Song
function selectSong(index) {

    loadSong(index);

    playlist.classList.remove("active");

}

// Keyboard Shortcuts
document.addEventListener("keydown", e => {

    if (e.code === "Space") {

        e.preventDefault();
        playPause();

    }

    if (e.code === "ArrowRight")
        nextSong();

    if (e.code === "ArrowLeft")
        prevSong();

});

// Load First Song
loadSong(0);