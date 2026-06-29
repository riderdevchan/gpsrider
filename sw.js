const CACHE_NAME = 'gps-tracker-v1'; // เปลี่ยน v1 เป็น v2, v3 เมื่อคุณแก้โค้ดใหม่ ปลายทางจะอัปเดตตามอัตโนมัติ
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => { if (key !== CACHE_NAME) return caches.delete(key); })
    ))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(cachedResponse => cachedResponse || fetch(e.request)));
});