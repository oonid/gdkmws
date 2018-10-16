const CACHE_NAME = 'gdkmws-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/gdkmws.css',
    '/footer-html.js',
    '/ulasan-minggu-3.html',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'https://use.fontawesome.com/releases/v5.3.1/webfonts/fa-solid-900.woff2',
    'https://use.fontawesome.com/releases/v5.3.1/webfonts/fa-regular-400.woff2',
];

self.addEventListener('install', function(event) {
    console.log('install sw');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // cache hit - return response
                if (response) {
                    console.log('respond '+event.request.url+' from cache');
                    return response;
                }

                console.log('respond '+event.request.url+' from network');
                return fetch(event.request)
                    .then(function (response) {
                        return caches.open(CACHE_NAME)
                            .then(function (cache) {
                                console.log('save response '+event.request.url+' to cache');
                                cache.put(event.request, response.clone());
                                return response;
                        })
                });
        })
    );
});
