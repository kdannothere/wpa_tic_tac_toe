import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// This line is replaced by the build process with a list of all your assets.
precacheAndRoute(self.__WB_MANIFEST);

// A simple caching strategy for navigation requests (e.g., your HTML pages).
// This ensures your app shell loads quickly from the cache.
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new StaleWhileRevalidate({
    cacheName: 'pages-cache',
  })
);

// The old 'install', 'fetch', and 'activate' listeners are no longer needed
// as Workbox handles this logic for you.