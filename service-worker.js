// 🧠 NPA Motivation Service Worker v1.0
const CACHE_NAME = 'npa-motivation-cache-v1';
const urlsToCache = [
  './',
  './admin-smart-motivation-v3.5.html',
  './manifest.json',
  './asset/npa-icon-512.png'
];

// Install service worker dan simpan file cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets...');
      return cache.addAll(urlsToCache);
    })
  );
});

// Aktifkan dan hapus cache lama
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('Menghapus cache lama:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Tangani permintaan fetch (offline support)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
