import crypto from 'crypto';

type Options = {
  init?: RequestInit; // eslint-disable-line no-undef
  group?: string;
  revalidate?: number;
};

// eslint-disable-next-line no-undef
const hashObject = (body: BodyInit): string => {
  const jsonString = JSON.stringify(body);
  const hash = crypto.createHash('md5').update(jsonString).digest('hex');
  return hash;
};

export const fetchX = async (url: string, options?: Options) => {
  const ttl = options?.revalidate || 360;
  const group = options?.group || 'bibata.misc';
  const init = options?.init;

  const key = `${url}${
    init?.method === 'POST' && init.body ? `-${hashObject(init?.body)}` : ''
  }`;
  const cache = await caches.open(group);
  let res = await cache.match(key);

  if (!res && !init?.signal?.aborted) {
    res = await fetch(url, { ...options?.init });

    if (res && res.status === 200) {
      const cacheTimestamp = new Date().toUTCString();
      if (res?.headers) {
        const headers = new Headers(res.headers);
        headers.set('x-cache-timestamp', cacheTimestamp);
        res = new Response(res.body, {
          status: res.status,
          statusText: res.statusText,
          headers
        });
        await cache.put(key, res.clone());
      } else {
        return;
      }
    } else {
      await cache.delete(key);
    }
  }

  if (!res?.headers) {
    return;
  } else {
    // Check if the cache has exceeded the TTL
    const cacheTimestamp = res.headers.get('x-cache-timestamp');
    if (cacheTimestamp) {
      const currentTime = Date.now();
      const cacheTime = new Date(cacheTimestamp).getTime();
      const cacheAge = (currentTime - cacheTime) / 1000; // Calculate cache age in seconds

      if (cacheAge > ttl) {
        // Cache has expired, delete it
        await cache.delete(key);
      }
    }

    return res;
  }
};
