/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = "specteam-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/src/index.css",
  "/manifest.json",
  "/robots.txt",
  "/sitemap.xml",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Dodaj obsługę fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Zwróć z cache jeśli znaleziono, w przeciwnym razie pobierz z sieci
      return response || fetch(event.request);
    })
  );
});

// Dodaj obsługę activate do czyszczenia starych cache'ów
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
