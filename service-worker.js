const CACHE = "music-player-v1";

const FILES = [
    "./",
    "./index.html",
    "./script.js",
    "./manifest.json",
    "./cover/cover.jpg",
    "./speakers/left.png",
    "./speakers/right.png",
    "./speakers/bottom.png"
];

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(FILES))
    );

});

self.addEventListener("fetch", event => {

    event.respondWith(
        caches.match(event.request).then(response => {

            return response || fetch(event.request);

        })
    );

});