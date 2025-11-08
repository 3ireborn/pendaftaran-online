const CACHE_NAME='npa-motivation-v3.5';
const URLS=[
  'admin-smart-motivation-v3.5.html',
  'data/leaders.json',
  'data/mitra.json',
  'data/motivation-weekly.json',
  'manifest.json'
];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(URLS)));
});
self.addEventListener('fetch',e=>{
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request))
  );
});
