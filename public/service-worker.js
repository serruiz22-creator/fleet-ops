const CACHE_NAME = 'fleet-pwa-v1';
const ASSETS = [
'/',
'/index.html',
];


self.addEventListener('install', (evt) => {
self.skipWaiting();
evt.waitUntil(
caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
);
});


self.addEventListener('activate', (evt) => {
evt.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', (evt) => {
if (evt.request.method !== 'GET') return;
evt.respondWith(
caches.match(evt.request).then((resp) => resp || fetch(evt.request).then(r=>{
// Optionally cache fetched assets here
return r;
}))
);
});