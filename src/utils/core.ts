import {
  CoreImage,
  CoreApiUploadResponse,
  CorePlatform,
  CoreApiDownloadError
} from 'bibata-live';

export class CoreApi {
  url: string;
  downloadUrl: string;

  constructor() {
    this.url = '/api/core';
    this.downloadUrl = `${this.url}/download`;
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

  public async uploadImages(data: FormData) {
    const res = await fetch(`${this.url}/upload`, {
      method: 'POST',
      body: data
    });

    return (await res.json()) as CoreApiUploadResponse;
  }

  public async downloadable(platform: CorePlatform) {
    const res = await fetch(this.downloadUrl);
    let data: CoreApiDownloadError | null = null;
    try {
      data = await res.json();
    } catch (e) {
      data = null;
    }
    return data;
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
