import { kv } from '@vercel/kv';
import { VercelKV, createClient } from '@vercel/kv';

import { SVG } from 'bibata/app';

export class ImageRedis {
  client: VercelKV;

  constructor() {
    this.client = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN
    });
  }

  public async del(key: string) {
    return await this.client.del(key);
  }

  public async get(key: string) {
    return await this.client.get(key);
  }

  public async saveSVGs(key: string, value: SVG[]) {
    const res = await this.client.set(key, value);
    res && console.info(`Updated Type '${key}'`);
  }

  public async rmOldUrls() {
    const keys = await this.client.keys('img:*');
    if (keys && keys.length > 0) {
      const num = await kv.del(...keys);
      console.log(`Deleted ${num} URLs.`);
    }
    return keys.length;
  }

  public async saveUrls(key: string, name: string, urls: (string | null)[]) {
    const res = await this.client.set(key, urls);
    res && console.info(`Updated '${name} with ${urls.length} URLs.'`);
  }
}
