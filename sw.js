const CACHE="foglio-ore-v5";
const CORE=["./","./index.html","./manifest.webmanifest","./Foglio_ore_template.xlsx","./Foglio_ore_template_bg.png"];

self.addEventListener("install",event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)));
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  const req=event.request;
  if(req.mode==="navigate" || req.url.endsWith("/index.html") || (req.url.includes("Foglio_ore_template.xlsx") || req.url.includes("Foglio_ore_template_bg.png"))){
    event.respondWith(
      fetch(req,{cache:"no-store"})
        .then(resp=>{
          const copy=resp.clone();
          caches.open(CACHE).then(c=>c.put(req,copy));
          return resp;
        })
        .catch(()=>caches.match(req))
    );
    return;
  }
  event.respondWith(caches.match(req).then(hit=>hit||fetch(req)));
});
