const CACHE_NAME = 'app-cache-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'icon.png'
];

// ขั้นตอนติดตั้ง Service Worker และบันทึกไฟล์ลง Cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// ขั้นตอนเรียกใช้งานไฟล์จาก Cache เมื่อเปิดแอป (ช่วยให้เปิดแอปได้แม้ไม่มีเน็ต)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
