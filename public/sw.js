const CACHE_NAME = 'gdkmws-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/gdkmws.css',
    '/footer-html.js',
    '/project3/index.html',
    '/project3/js/map.js',
    '/project3/data/map.json',
    '/project3/css/mystyle.css',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'https://use.fontawesome.com/releases/v5.3.1/webfonts/fa-regular-400.woff2',
    'https://unpkg.com/leaflet@1.3.4/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.4/dist/leaflet.js',
];
const domainsToCache = [  /** cache less to avoid Uncaught (in promise) DOMException: Quota exceeded **/
    '127.0.0.1',
    'localhost',
    'gdkmws.firebaseapp.com',
    'use.fontawesome.com',
    'unpkg.com',
    'api.tiles.mapbox.com'
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
                        // filter to cache on specific domains
                        const domain = event.request.url.split('/')[2];
                        if(domainsToCache.indexOf(domain) > -1) {  // domain found on list, save to cache
                            return caches.open(CACHE_NAME)
                                .then(function (cache) {
                                    console.log('save response '+event.request.url+' to cache');
                                    cache.put(event.request, response.clone());
                                    return response;
                                })
                        }
                        return response;  // default (not caching)
                });
        })
    );
});
