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
import { genAccessToken } from './auth/token';

export class CoreApi {
  url: string;
  downloadUrl: string;
  auth: AuthToken | undefined;

  constructor() {
    this.url = 'http://localhost:3000/api/core';
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
    const accessToken = token || genAccessToken();
    const res = await fetch(`${this.url}/session`, {
      headers: this.__headers(accessToken),
      credentials: 'include'
    });

    const data: GetSessionResponse = await res.json();

    const payload = jwt.decode(data.token) as AuthToken;
    const auth = { ...payload, token: data.token };
    this.auth = auth;
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

  public async uploadImages(body: FormData) {
    const res = await fetch(`${this.url}/upload`, {
      headers: this.__headers(this.auth?.token),
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
    const res = await fetch(`${this.downloadUrl}?type=${platform}`, {
      headers: this.__headers(this.auth?.token)
    });

    if (res.status === 200) {
      return null;
    } else {
      const data = await res.json();
      return data as DownloadError;
    }
  }
}
