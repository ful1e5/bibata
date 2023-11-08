type Options = {
  group?: string;
  revalidate?: number;
};

export const fetchX = async (url: string, options?: Options) => {
  const ttl = options?.revalidate || 360;
  const group = options?.group || 'bibata.misc';

  const cache = await caches.open(group);
  let res = await cache.match(url);

  if (!res) {
    res = await fetch(url, { next: { revalidate: 360 } });

    if (res.status === 200) {
      const cacheTimestamp = new Date().toUTCString();
      const headers = new Headers(res.headers);
      headers.set('x-cache-timestamp', cacheTimestamp);
      res = new Response(res.body, {
        status: res.status,
        statusText: res.statusText,
        headers
      });
      await cache.put(url, res.clone());
    } else {
      await cache.delete(url);
    }
  }

  // Check if the cache has exceeded the TTL
  const cacheTimestamp = res.headers.get('x-cache-timestamp');
  if (cacheTimestamp) {
    const currentTime = Date.now();
    const cacheTime = new Date(cacheTimestamp).getTime();
    const cacheAge = (currentTime - cacheTime) / 1000; // Calculate cache age in seconds

    if (cacheAge > ttl) {
      // Cache has expired, delete it
      await cache.delete(url);
    }
  }

  return res;
};
