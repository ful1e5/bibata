import Redis, { RedisKey } from 'ioredis';

import { SVG } from 'bibata/app';

export class ImageRedis {
  client: Redis;

  constructor() {
    this.client = this.__connect();
  }

  private __connect() {
    const client: Redis = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      lazyConnect: true
    });
    client.on('ready', () => {
      console.info('Redis cluster Ready');
    });
    client.on('error', (error) => {
      console.error(`Redis cluster Connection Error: ${error}`);
    });
    client.on('end', () => {
      console.info('Redis cluster Connection ended');
    });

    return client;
  }

  public async del(key: RedisKey) {
    return await this.client.del(key);
  }

  public async get(key: RedisKey) {
    return await this.client.get(key);
  }

  public async saveSVGs(key: RedisKey, value: SVG[]) {
    await this.client.set(key, JSON.stringify(value), (s) => {
      s && console.info(`Updated Type '${key}': ${s} `);
    });
  }

  public async rmOldUrls() {
    const keys = await this.client.keys('i-*');
    if (keys && keys.length > 0) {
      const num = await this.client.del(...keys);
      console.log(`Deleted ${num} URLs.`);
    }
  }

  public async saveUrls(key: RedisKey, name: string, urls: (string | null)[]) {
    return await this.client.set(key, JSON.stringify(urls), (s) => {
      s && console.info(`Updated '${name}': ${s} `);
    });
  }
}
