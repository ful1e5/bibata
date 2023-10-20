import {
  UploadResponse,
  Platform,
  DownloadResponse,
  GetSessionResponse,
  DeleteSessionResponse,
  AuthError
} from 'bibata-live/core';

export class CoreApi {
  url: string;
  downloadUrl: string;

  constructor() {
    this.url = '/api/core';
    this.downloadUrl = `${this.url}/download`;
  }

  public async getSession(token?: string) {
    const headers = token
      ? {
          Authorization: `Bearer ${token}`
        }
      : undefined;
    const res = await fetch(`${this.url}/session`, {
      headers: headers,
      credentials: 'include'
    });

    const data: GetSessionResponse = await res.json();
    return data;
  }

  public async deleteSession() {
    const res = await fetch(`${this.url}/session`, {
      method: 'DELETE',
      credentials: 'include'
    });

    const data = await res.json();
    return data as DeleteSessionResponse;
  }

  public async uploadImages(body: FormData) {
    const res = await fetch(`${this.url}/upload`, {
      method: 'POST',
      body
    });

    const data = await res.json();
    if (res.status === 401) {
      return data as AuthError;
    } else {
      return data as UploadResponse;
    }
  }

  public async downloadable(platform: Platform) {
    const res = await fetch(`${this.downloadUrl}?type=${platform}`);

    if (res.status === 301) {
      return null;
    } else {
      const data = await res.json();
      if (res.status === 401) {
        return data as AuthError;
      } else if (res.status === 400) {
        return data as DownloadResponse;
      }
    }
  }
}
