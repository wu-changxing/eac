// src/serviceWorker.js
const CACHE = "offline-first-cache";

// On install, cache some resources.
self.addEventListener("install", function (evt) {
    console.log("The service worker is being installed.");

    // Precache static resources here.
    evt.waitUntil(
        caches.open(CACHE).then((cache) => {
            return cache.addAll([
                './',
                // Add more static files here for offline access
                // like your CSS, Images and JavaScript files
            ]);
        })
    );
});

// On fetch, use cache but update the entry with the latest contents
// from the server.
self.addEventListener("fetch", function (evt) {
    console.log("The service worker is serving the asset.");
    if (evt.request.method === 'GET') {
        evt.respondWith(fromNetwork(evt.request, 1000).catch(function () {
            return fromCache(evt.request);
        }));
    } else {
        evt.respondWith(fetch(evt.request));
    }
});

// notification permissions dialog.
self.addEventListener('pushsubscriptionchange', function (event) {
    console.log('Subscription expired');
    event.waitUntil(
        self.registration.pushManager.subscribe({userVisibleOnly: true})
            .then(function (subscription) {
                console.log('Subscribed after expiration', subscription.endpoint);
                return fetch('register', {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        endpoint: subscription.endpoint
                    })
                });
            })
    );
});

self.addEventListener('push', function (event) {
    // You might want to customize this. It's just an example
    var title = 'New message';
    var options = {
        body: 'You have a new message',
        icon: '../assets/macaw-on-tree1.svg',
        badge: '../assets/macaw-on-tree2.svg'

    };

    event.waitUntil(self.registration.showNotification(title, options));
});

function fromNetwork(request, timeout) {
    return new Promise(function (fulfill, reject) {
        var timeoutId = setTimeout(reject, timeout);
        fetch(request).then(function (response) {
            clearTimeout(timeoutId);
            fulfill(response);
        }, reject);
    });
}

function fromCache(request) {
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}
