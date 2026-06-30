const songs = [
{
    title: "Miles Can't Change Us",
    logo: "songs/song1/logo.png",
    cover: "songs/song1/cover.png",
    audio: "songs/song1/Miles Can't Change Us.mp3"
},
{
    title: "Faded",
    logo: "songs/song2/logo.png",
    cover: "songs/song2/cover.jpg",
    audio: "songs/song2/song.mp3"
},
{
    title: "Alone",
    logo: "songs/song3/logo.png",
    cover: "songs/song3/cover.jpg",
    audio: "songs/song3/song.mp3"
},
{
    title: "On My Way",
    logo: "songs/song4/logo.png",
    cover: "songs/song4/cover.jpg",
    audio: "songs/song4/song.mp3"
},
{
    title: "Unity",
    logo: "songs/song5/logo.png",
    cover: "songs/song5/cover.jpg",
    audio: "songs/song5/song.mp3"
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

    audio.load();
}

loadSong(0);

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
    audio.play();

    playBtn.innerHTML = "⏸";
    cover.classList.add("playing");

}

// Previous
function prevSong(){

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    audio.play();

    playBtn.innerHTML = "⏸";
    cover.classList.add("playing");

}

// Auto Next
audio.addEventListener("ended", nextSong);

// Progress
audio.addEventListener("timeupdate",()=>{

    if(audio.duration){

        progress.value = (audio.currentTime / audio.duration) * 100;

        current.textContent = formatTime(audio.currentTime);
        duration.textContent = formatTime(audio.duration);

    }

});

// Seek
progress.addEventListener("input",()=>{

    if(audio.duration){

        audio.currentTime = (progress.value / 100) * audio.duration;

    }

});

// Format Time
function formatTime(time){

    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;

}

// Open Playlist
cover.addEventListener("click",()=>{

    playlist.classList.toggle("active");

});

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

        audio.play();

        playBtn.innerHTML = "⏸";
        cover.classList.add("playing");

        playlist.classList.remove("active");

    };

    playlist.appendChild(item);

});

// Keyboard
document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){
        e.preventDefault();
        playPause();
    }

    if(e.code==="ArrowRight"){
        nextSong();
    }

    if(e.code==="ArrowLeft"){
        prevSong();
    }

});
