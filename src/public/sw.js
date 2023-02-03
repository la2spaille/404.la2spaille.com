const N = 'brain'
const o = origin
const res = [
    '/offline/index.html',
    o + '/',
    o + '/brain?xhr=true',
    o + '/manifest.json',
    o + '/css/style.css',
    o + '/js/app.js',
    o + '/fav/192.png',
    o + '/fav/512.png',
    o + '/fonts/Amulya-Variable.woff',
    o + '/fonts/Amulya-Variable.woff2',
    o + '/fonts/Amulya-Variable.ttf',
    o + '/fonts/Amulya-VariableItalic.woff',
    o + '/fonts/Amulya-VariableItalic.woff2',
    o + '/fonts/Amulya-VariableItalic.ttf',
    o + '/fonts/NewTitle-Variable.woff',
    o + '/fonts/NewTitle-Variable.woff2',
    o + '/fonts/NewTitle-Variable.ttf',

]


self.addEventListener('install', (e) => {
    self.skipWaiting()
    e.waitUntil(
        caches.open(N)
            .then(c => {
                c.addAll(res)
            })
    )
})

self.addEventListener('activate', (e) => {
    clients.claim()
    e.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys.map((key) => {
                        if (key === N) {
                            return
                        }
                        return caches.delete(key)
                    })
                )
            })
    )
})
self.addEventListener('fetch', e => {

    if (e.request.mode === 'navigate') {
        e.respondWith(fetch(e.request.url).catch(error => {
            return caches.match('/offline/index.html')
        }))

    } else if (res.includes(e.request.url)) {
        e.respondWith(caches.match(e.request))
        e.waitUntil(fetch(e.request.url).then(r => {
            caches.open(N)
                .then(c => {
                    c.put(e.request, r.clone())
                })
        }))
        
    }
    return

})

