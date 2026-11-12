/* Offline support: keep the game and its fonts and icons on the device. Bump VERSION on every release. */
const VERSION="loopaloo-v2";
const FILES=["./","index.html","manifest.webmanifest","fonts/fonts.css","fonts/Fredoka.woff2","fonts/Nunito.woff2","fonts/PlaywriteUSTrad.woff2","icons/icon-192.png","icons/icon-512.png","icons/apple-touch-icon.png","privacy.html"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
/* the page itself: network first so updates arrive, cache when offline. everything else: cache first */
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET")return;
  if(r.mode==="navigate"){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(VERSION).then(x=>x.put("index.html",c));return res}).catch(()=>caches.match("index.html")));return}
  e.respondWith(caches.match(r).then(hit=>hit||fetch(r)))});
