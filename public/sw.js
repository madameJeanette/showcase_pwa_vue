const staticCacheName = "cacheShell-static-v3"
const dynamicCacheName = "site-dynamic-v1"
const NetworkOnlyAssets = [
  '/api/projects/tags/'
]
const assets = [     
    
  '/',
  './img/icons/android-chrome-192x192.png',
  '/index.html',
  'app.js',
  'main.js',
  'dist/**/*',
  './js/*.js',
  './img/icons/android-chrome-512x512.png', 
  'fallback.html',
    
];

// Call Install Event
self.addEventListener('install', event => {
  // console.log('Service Worker: Installed');

  // event.waitUntil(async function() {
    //promise to define the length & success of the install.
    event.waitUntil(
     caches.open(staticCacheName)
     .then(cache => {
      // console.log('caching shell assets')
      cache.addAll(assets);
     }) 
      //If any of the resources fail to fetch, the cache.addAll call rejects.
  );
});

 // Call Activate Event
self.addEventListener('activate', event => {
//  console.log('Service Worker: Activated');



// Remove unwanted caches

    event.waitUntil(
      caches.keys().then(keys => {
          // console.log('keys:', keys); ////
          return Promise.all(keys
            .filter(key => key !== staticCacheName && key !== dynamicCacheName)
            .map(key => caches.delete(key))
            )
      }),
      //store data on activate
     
    )
  })



self.addEventListener('fetch', event => {
console.log('fetch event')
//cache first fallback network response
  event.respondWith(
    caches.match(event.request)
      .then(cacheRes => {
        return cacheRes || fetch(event.request)
       // Cache hit - return the response from the cached version
      .then(fetchRes => {
         // Not in cache - return the result from the live server
        // `fetch` is essentially a "fallback"
        return caches.open(dynamicCacheName)
        .then(cache => {
          cache.put(event.request.url, fetchRes.clone());
          return fetchRes;
        })
      });
    })
     .catch(() => caches.match('fallback.html'))
  );
 });


//Call fetch event NetworkOnly

// self.addEventListener('fetch', (event.url(/tags)) => {
//   event.respondWith(fetch(event.request));
//   // or simply don't call event.respondWith, which
//   // will result in default browser behaviour
// });


// // In serviceworker.js
// self.addEventListener('fetch', (event) => {
//   const destination = event.request.destination;
//   switch (destination) {
//     case 'style':
//     case 'script':
//     case 'document':
//     case 'image': {
//       event.respondWith( 
        
//         caches.match(event.request)
//       .then(function(response) {
//         // Cache hit - return the response from the cached version
//         if (response) {
//           return response;
//         }

//         // Not in cache - return the result from the live server
//         // `fetch` is essentially a "fallback"
//         return fetch(event.request);
//       }
//           /* "Network Falling Back to Cache" strategy */);
//       return;
//     }
//     case 'font': {
//       event.respondWith(/* "Cache Only" strategy */);
//       return;
//     }
//     // All `XMLHttpRequest` or `fetch()` calls where
//     // `Request.destination` is the empty string default value
//     default: {
//       event.respondWith(/* "Network Only" strategy */);
//       return;
//     }
//   }
// });