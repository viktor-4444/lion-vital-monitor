
const CACHE_NAME = 'lion-vital-monitor-v2';

const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Instalar y preparar la nueva caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(APP_FILES);
      await self.skipWaiting();
    })()
  );
});

// Activar la nueva versión y eliminar cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );

      await self.clients.claim();
    })()
  );
});

// Consultar primero internet y usar la caché si no hay conexión
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      try {
        const response = await fetch(event.request);

        if (response && response.ok) {
          await cache.put(event.request, response.clone());
        }

        return response;
      } catch (error) {
        const cached = await cache.match(event.request);

        if (cached) return cached;

        if (event.request.mode === 'navigate') {
          const fallback = await cache.match('./index.html');
          if (fallback) return fallback;
        }

        return new Response('Sin conexión disponible', {
          status: 503,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    })()
  );
});
