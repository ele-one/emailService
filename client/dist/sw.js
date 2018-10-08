self.addEventListener('install', function(e) {
  console.log('installing')
 e.waitUntil(
   caches.open('brown-gateway-pwa').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.css',
       '/bundle.js',
       '/index.js'
     ]);
   })
 );
});

// self.addEventListener('fetch', function(e) {
//   console.log(e.request.url);
//   e.respondWith(
//     caches.match(e.request).then(function(response) {
//       return response || fetch(e.request);
//     })
//   );
// });

self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        if (response) {
          return response
        }
        if (!response) {
         return fetch(e.request).catch((err) => {
          }).then((response) => {
            return caches.open('brown-other-pwa').then(function(cache) {
             cache.put(e.request.url, response.clone())
            })
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    );
});



