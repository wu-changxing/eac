// src/serviceWorker.js

// On install, take control of the page immediately.
self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');
    evt.waitUntil(self.skipWaiting());
});

// On activation, clear old cache and claim the page.
self.addEventListener('activate', function(evt) {
    console.log('The service worker is being activated.');
    evt.waitUntil(self.clients.claim());
});

// On fetch, perform no operation.
self.addEventListener('fetch', function(evt) {
    // Do nothing. This is just needed for the website to be installable.
});
