const CACHE="foglio-ore-v1";
const ASSETS=["./","./index.html","./manifest.webmanifest","./Foglio_ore_template.xlsx","https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(ASSETS.map(a=>c.add(a))))));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
