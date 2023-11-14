import Redis, { RedisKey } from 'ioredis';

import { SVG } from 'bibata/app';

export class ImageRedis {
  constructor() {}

  private __createClient() {
    const client = new Redis({
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD,
      port: process.env.REDIS_PORT
    });
    client.on('error', (err) => {
      if (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error(err.stack);
        } else {
          console.error(err.message);
        }
        client.disconnect();
      }
      return;
    });
    return client;
  }

  public async del(key: RedisKey) {
    const client = this.__createClient();
    const res = await client.del(key);
    await client.quit();

    return res;
  }

  public async get(key: RedisKey) {
    const client = this.__createClient();
    const res = await client.get(key);
    await client.quit();

    return res;
  }

  public async saveSVGs(key: RedisKey, value: SVG[]) {
    const client = this.__createClient();
    const res = await client.set(key, JSON.stringify(value), (s) => {
      if (s) {
        console.info(`Updated Type '${key}': ${s} `);
      }
    });
    await client.quit();

    return res;
  }

  public async rmOldUrls() {
    const client = this.__createClient();
    const keys = await client.keys('i-*');
    if (keys && keys.length > 0) {
      const n = await client.del(...keys);
      console.log(`Deleted ${n} URLs.`);
    }
    await client.quit();
  }

  public async saveUrls(key: RedisKey, name: string, urls: (string | null)[]) {
    const client = this.__createClient();
    const res = await client.set(key, JSON.stringify(urls), (s) => {
      if (s) {
        console.info(`Updated '${name}': ${s} `);
      }
    });
    await client.quit();

    return res;
  }
}
