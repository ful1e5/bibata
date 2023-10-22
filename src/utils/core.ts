import jwt from 'jsonwebtoken';

import {
  UploadResponse,
  Platform,
  GetSessionResponse,
  DeleteSessionResponse,
  AuthError,
  AuthToken,
  DownloadError
} from 'bibata-live/core';

export class CoreApi {
  url: string;
  downloadUrl: string;

  constructor() {
    this.url = '/api/core';
    this.downloadUrl = `${this.url}/download`;
  }

  private __headers(token?: string) {
    return token
      ? {
          Authorization: `Bearer ${token}`
        }
      : undefined;
  }

  public async getSession(token?: string) {
    const res = await fetch(`${this.url}/session`, {
      headers: this.__headers(token),
      credentials: 'include'
    });

    const data: GetSessionResponse = await res.json();

    const payload = jwt.decode(data.token) as AuthToken;
    const auth = { ...payload, token: data.token };
    return auth;
  }

  public async deleteSession() {
    const res = await fetch(`${this.url}/session`, {
      method: 'DELETE',
      credentials: 'include'
    });

    const data = await res.json();
    return data as DeleteSessionResponse;
  }

  public async uploadImages(body: FormData, headers?: { token?: string }) {
    const res = await fetch(`${this.url}/upload`, {
      headers: this.__headers(headers?.token),
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

  public async downloadable(platform: Platform, headers?: { token?: string }) {
    const res = await fetch(`${this.downloadUrl}?type=${platform}`, {
      headers: this.__headers(headers?.token)
    });

    if (res.status === 200) {
      return null;
    } else {
      const data = await res.json();
      return data as DownloadError;
    }
  }
}
