import { kv } from '@vercel/kv';

import { SVG } from 'bibata/app';

export class ImageRedis {
  constructor() {}

  public async del(key: string) {
    return await kv.del(key);
  }

  public async get(key: string) {
    return await kv.get(key);
  }

  public async saveSVGs(key: string, value: SVG[]) {
    const res = await kv.set(key, JSON.stringify(value));
    res && console.info(`Updated Type '${key}'`);
  }

  public async rmOldUrls() {
    const keys = await kv.keys('i-*');
    if (keys && keys.length > 0) {
      const num = await kv.del(...keys);
      console.log(`Deleted ${num} URLs.`);
    }
  }

  public async saveUrls(key: string, name: string, urls: (string | null)[]) {
    const res = await kv.set(key, JSON.stringify(urls));
    res && console.info(`Updated '${name}':`);
  }
}
