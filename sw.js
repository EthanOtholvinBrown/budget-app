// Keeps the launcher itself available offline; the budget data always comes live from Google.
const C = 'budget-launcher-v1';
self.addEventListener('install', e => e.waitUntil(caches.open(C).then(c => c.addAll(['./', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'])).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
