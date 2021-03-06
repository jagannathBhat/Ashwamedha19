let CACHE_NAME = 'ashwamedha19-cache-v3'
let urlsToCache = [
    '/',
    '/assets/css/style.css',
    '/assets/css/home.css',
    '/assets/data/events.json',
    '/assets/docs/ashwamedha19rules.pdf',
    '/assets/docs/oswald/Oswald-Regular.ttf',
    '/assets/image/bgbw.png',
    '/assets/image/stuntbg.jpg',
    '/assets/image/bmwbg.jpg'
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    )
})

self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
                return response
            }
            let responseToCache = response.clone()
            caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseToCache)
            })
            return response
        }).catch(() => {
            return caches.match(event.request)
        })
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(
            cacheNames => Promise.all(
                cacheNames.filter(cacheName => true).map(
                    cacheName => caches.delete(cacheName)
                )
            )
        )
    )
})