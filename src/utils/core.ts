import { Platform } from '@prisma/client';
import { AuthToken } from 'bibata-live/core-api/types';

import {
  AuthError,
  DeleteSessionResponse,
  DownloadError,
  GetSessionResponse,
  UploadResponse
} from 'bibata-live/core-api/responses';

export class CoreApi {
  url: string;
  downloadUrl: string;
  jwt: AuthToken | undefined;

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

  public async getSession(token: string) {
    const res = await fetch(`${this.url}/session`, {
      headers: this.__headers(token),
      credentials: 'include'
    });

    const data: GetSessionResponse = await res.json();
    this.jwt = { ...data, token: token };
    return this.jwt;
  }

  public async deleteSession() {
    const res = await fetch(`${this.url}/session`, {
      method: 'DELETE',
      credentials: 'include'
    });

    const data = await res.json();
    return data as DeleteSessionResponse;
  }

  public async refreshSession(token: string) {
    await this.deleteSession();
    return await this.getSession(token);
  }

  public async uploadImages(body: FormData) {
    const res = await fetch(`${this.url}/upload`, {
      headers: this.__headers(this.jwt?.token),
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
      headers: this.__headers(this.jwt?.token)
    });

    if (res.status === 200) {
      return null;
    } else {
      const data = await res.json();
      return data as DownloadError;
    }
  }
}
