const songs = [
{
    title: "Miles Can't Change Us",
    logo: "songs/1/logo.png",
    cover: "songs/1/cover.jpg",
    audio: "songs/1/Miles Can't Change Us.mp3"
},
{
    title: "Faded",
    logo: "songs/2/logo.png",
    cover: "songs/2/cover.jpg",
    audio: "songs/2/song.mp3"
},
{
    title: "Alone",
    logo: "songs/3/logo.png",
    cover: "songs/3/cover.jpg",
    audio: "songs/3/song.mp3"
},
{
    title: "On My Way",
    logo: "songs/4/logo.png",
    cover: "songs/4/cover.jpg",
    audio: "songs/4/song.mp3"
},
{
    title: "Unity",
    logo: "songs/5/logo.png",
    cover: "songs/5/cover.jpg",
    audio: "songs/5/song.mp3"
}
];

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
function loadSong(index){

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
function playPause(){

    if(audio.paused){

        audio.play();
        playBtn.innerHTML = "⏸";
        cover.classList.add("playing");

    }else{

        audio.pause();
        playBtn.innerHTML = "▶";
        cover.classList.remove("playing");

    }

}

// Next
function nextSong(){

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);

}

// Previous
function prevSong(){

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

}

// Progress
audio.addEventListener("timeupdate",()=>{

    if(!audio.duration) return;

    progress.value = (audio.currentTime / audio.duration) * 100;

    current.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);

});

// Seek
progress.addEventListener("input",()=>{

    if(!audio.duration) return;

    audio.currentTime = (progress.value / 100) * audio.duration;

});

// Auto Next
audio.addEventListener("ended",nextSong);

// Format Time
function formatTime(time){

    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;

}

// Open / Close Playlist
cover.onclick = ()=>{

    playlist.classList.toggle("active");

};

// Create Playlist
songs.forEach((song,index)=>{

    const item = document.createElement("div");

    item.className = "song";

    item.innerHTML = `
        <img src="${song.cover}">
        <div class="song-name">${song.title}</div>
    `;

    item.onclick = ()=>{

        loadSong(index);
        playlist.classList.remove("active");

    };

    playlist.appendChild(item);

});

// Keyboard Shortcuts
document.addEventListener("keydown",(e)=>{

    switch(e.code){

        case "Space":
            e.preventDefault();
            playPause();
            break;

        case "ArrowRight":
            nextSong();
            break;

        case "ArrowLeft":
            prevSong();
            break;

    }

});

// Load First Song
loadSong(0);
