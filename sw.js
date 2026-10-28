// Bump CACHE when you update the game so players get the new version.
const CACHE='arrowout-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./','index.html','manifest.json'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=CACHE).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    const cp=res.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return res
  }).catch(()=>caches.match('index.html'))));
});
