import { CoreImage, CoreApiUploadResponse, CorePlatform } from 'bibata-live';

export class CoreApi {
  url: string;

  constructor() {
    this.url = '/api/core';
  }

  public async getSession() {
    const res = await fetch(`${this.url}/session`, {
      credentials: 'include'
    });

    const data: { id: string } = await res.json();

    if (data.id) {
      return data.id;
    } else {
      return null;
    }
  }

  public async uploadImages(images: Set<CoreImage>, platform: CorePlatform) {
    const res = await fetch(`${this.url}/upload`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ images: Array.from(images), platform })
    });

    return (await res.json()) as CoreApiUploadResponse;
  }

  public async download() {
    await fetch(`${this.url}/download`);
  }

  public async destroySession() {
    const res = await fetch(`${this.url}/session`, {
      method: 'DELETE',
      credentials: 'include'
    });

    const data: { id: string } = await res.json();

    if (data.id) {
      return data.id;
    } else {
      return null;
    }
  }
}
