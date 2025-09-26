// Service Worker for offline functionality
// TODO: Implement proper caching strategies

const CACHE_NAME = 'tourist-safety-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Handle background sync for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'location-sync') {
    // TODO: Sync location data when online
    console.log('TODO: Sync offline location data');
  }
  
  if (event.tag === 'incident-sync') {
    // TODO: Sync incident reports when online
    console.log('TODO: Sync offline incident reports');
  }
});

// Handle push notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      vibrate: [200, 100, 200],
      data: data.data || {},
      actions: data.actions || []
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'acknowledge') {
    // TODO: Handle alert acknowledgment
    console.log('TODO: Acknowledge alert via service worker');
  } else {
    // Open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});