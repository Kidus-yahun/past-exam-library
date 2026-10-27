// sw.js - Service Worker for Past Exam Library (Blessed G/Michael Catholic Secondary School)
// Provides 100% offline practice, low-data caching, and fast PDF study access

const CACHE_VERSION = 'v1.2.0';
const STATIC_CACHE = `past-exam-static-${CACHE_VERSION}`;
const API_CACHE = `past-exam-api-${CACHE_VERSION}`;
const PDF_CACHE = `past-exam-pdf-${CACHE_VERSION}`;

const CORE_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    '/icons/apple-touch-icon.png',
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
];

// 1. Install Event: Cache Core Application Shell
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE).then(async (cache) => {
            console.log('[ServiceWorker] Pre-caching core application shell');
            for (const asset of CORE_ASSETS) {
                try {
                    await cache.add(asset);
                } catch (err) {
                    console.warn(`[ServiceWorker] Could not pre-cache asset: ${asset}`, err.message);
                }
            }
        })
    );
    self.skipWaiting();
});

// 2. Activate Event: Clean up stale caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== STATIC_CACHE && name !== API_CACHE && name !== PDF_CACHE) {
                        console.log('[ServiceWorker] Removing stale cache:', name);
                        return caches.delete(name);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 3. Fetch Event: Intelligent multi-tier caching
self.addEventListener('fetch', (event) => {
    const req = event.request;
    const url = new URL(req.url);

    // Non-GET requests (e.g. login, upload) pass through directly to network
    if (req.method !== 'GET') {
        return;
    }

    // A. API Requests (/api/practice, /api/categories, /api/exams)
    // Strategy: Stale-While-Revalidate (Instant response from cache, background refresh when online)
    if (url.pathname.startsWith('/api/')) {
        // Do not cache sensitive auth check or stats mutations aggressively
        if (url.pathname.includes('/auth/login') || url.pathname.includes('/auth/register')) {
            return;
        }

        event.respondWith(
            caches.open(API_CACHE).then(async (cache) => {
                const cachedResponse = await cache.match(req);

                const fetchPromise = fetch(req).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        cache.put(req, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(() => {
                    // Network failed (offline)
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    // If no cached data, return offline JSON
                    return new Response(JSON.stringify({
                        success: false,
                        offline: true,
                        message: 'You are currently offline. Showing cached resources where available.',
                        questions: [],
                        exams: []
                    }), {
                        headers: { 'Content-Type': 'application/json' }
                    });
                });

                return cachedResponse || fetchPromise;
            })
        );
        return;
    }

    // B. PDF Past Papers (/exams/... or CDN raw github pdf files)
    // Strategy: Cache-First (Once opened or saved, accessible offline anytime)
    if (url.pathname.endsWith('.pdf') || url.pathname.includes('/exams/')) {
        event.respondWith(
            caches.open(PDF_CACHE).then(async (cache) => {
                const cachedPdf = await cache.match(req);
                if (cachedPdf) {
                    return cachedPdf;
                }

                try {
                    const networkResponse = await fetch(req);
                    if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
                        cache.put(req, networkResponse.clone());
                    }
                    return networkResponse;
                } catch (err) {
                    console.warn('[ServiceWorker] PDF fetch failed offline:', req.url);
                    if (cachedPdf) return cachedPdf;
                    throw err;
                }
            })
        );
        return;
    }

    // C. Static Assets & App Shell
    // Strategy: Stale-While-Revalidate for JS/CSS, Cache-first for images/fonts
    event.respondWith(
        caches.match(req).then((cachedResponse) => {
            const fetchPromise = fetch(req).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const resClone = networkResponse.clone();
                    caches.open(STATIC_CACHE).then((cache) => cache.put(req, resClone));
                }
                return networkResponse;
            }).catch(() => {
                // If navigation request fails offline, fallback to root index.html
                if (req.mode === 'navigate') {
                    return caches.match('/index.html') || caches.match('/');
                }
            });

            return cachedResponse || fetchPromise;
        })
    );
});
