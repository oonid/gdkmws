const CACHE_NAME = 'gdkmws-project1-cache-v1';
const urlsToCache = [
    '/project1/',
    '/project1/index.html',
    '/project1/add2numbers.js',
];

self.addEventListener('install', function(event) {
    console.log('install sw');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(function () {
                console.log('cache open failed.');
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // cache hit - return response
            if (response) {
                console.log('respond '+event.request.url+' from cache');
                return response;
            }
            console.log('respond '+event.request.url+' from network');
            return fetch(event.request);
        })
    );
});
