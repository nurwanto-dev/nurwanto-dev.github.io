const staticCacheName = 'site-static';
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  // This will be called only once when the service worker is activated.
  evt.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName != staticCacheName
        }).map(function (cacheName) {
          return caches.delete(cacheName)
        })
      );
    })
  );
  // try {
  //   const options = {}
  //   const subscription = self.registration.pushManager.subscribe(options)
  //   console.log(JSON.stringify(subscription))
  // } catch (err) {
  //   console.log('Error', err)
  // }
});

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(evt.request);
    }
    )
  );

  // evt.respondWith(
  //   caches.match(evt.request).then((resp) => {
  //     if (resp) {
  //       return resp;
  //     };
  //   })
  // )
});