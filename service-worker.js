self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('npa-v1').then((cache) => {
      return cache.addAll([
        './tools/admin-smart-motivation.html',
        './asset/npa-icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
