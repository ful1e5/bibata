import { LIB_VERSION } from '@root/version';

import { Platform } from '@prisma/client';

import {
  AuthError,
  DeleteSessionResponse,
  DownloadError,
  GetSessionResponse,
  UploadResponse
} from 'bibata/core-api/responses';
import { AuthToken } from 'bibata/core-api/types';

export class CoreApi {
  url: string;
  jwt: AuthToken | undefined;

  constructor() {
    this.url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
      : '/api/core';
  }

  private __headers(token?: string) {
    return token
      ? {
          Authorization: `Bearer ${token}`
        }
      : undefined;
  }

  public async getSession(token?: string) {
    token = token || this.jwt?.token;
    const res = await fetch(`${this.url}/session`, {
      headers: this.__headers(token),
      credentials: 'include'
    });

    const data: GetSessionResponse = await res.json();
    this.jwt = { ...data, token: token! };
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

  public async refreshSession(token?: string) {
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

  public downloadUrl(p: Platform, n: string) {
    return `${this.url}/download?platform=${p}&name=${n}&v=${LIB_VERSION}`;
  }

  public async downloadable(p: Platform, n: string) {
    const res = await fetch(this.downloadUrl(p, n), {
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
