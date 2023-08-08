// // src/serviceWorker.js
//
// // On install, take control of the page immediately.
// self.addEventListener('install', function(evt) {
//     console.log('The service worker is being installed.');
//     evt.waitUntil(self.skipWaiting());
// });
//
// // On activation, clear old cache and claim the page.
// self.addEventListener('activate', function(evt) {
//     console.log('The service worker is being activated.');
//     evt.waitUntil(
//         caches.keys().then((cacheNames) => {
//             return Promise.all(
//                 cacheNames.map((cacheName) => {
//                     return caches.delete(cacheName);
//                 })
//             );
//         })
//     );
// });
//
// // On fetch, always fetch from the network
// self.addEventListener('fetch', function(evt) {
//     evt.respondWith(fetch(evt.request));
// });
