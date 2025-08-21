const CACHE_NAME = 'barcode-scanner-cache-v1';
const urlsToCache = [
    '/barcode_scanner.html',
    '/', // Represents the root, often redirects to index.html or similar
    'https://cdn.tailwindcss.com',
    'https://cdn.jsdelivr.net/npm/quagga@0.12.1/dist/quagga.min.js'
    // Add any other assets your app uses (e.g., custom icons if you replace placeholders)
];

// Install event: cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event: serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // Delete old caches
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
