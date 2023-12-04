import { Platform } from '@prisma/client';

import {
  AuthError,
  DeleteSessionResponse,
  DownloadError,
  DownloadFile,
  GetSessionResponse,
  UploadResponse
} from 'bibata/core-api/responses';
import { AuthToken } from 'bibata/core-api/types';

export class CoreApi {
  url: string;
  jwt: AuthToken | undefined;

  constructor() {
    this.url = '/api/core';
  }

  private __headers(token?: string) {
    return token
      ? {
          Authorization: `Bearer ${token}`
        }
      : undefined;
  }

  public async getSession(token?: string) {
    if (!token) {
      throw new Error(
        'Unable to generate a core API session. The token is undefined.'
      );
    }
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
    this.jwt = undefined;
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

  private __downloadUrl(p: Platform, n: string, v: string) {
    return `${this.url}/download?platform=${p}&name=${n}&v=${v}`;
  }

  public async download(p: Platform, n: string, v: string) {
    const res = await fetch(this.__downloadUrl(p, n, v), {
      headers: this.__headers(this.jwt?.token)
    });

    if (res.status === 200) {
      try {
        const blob = await res.blob();
        const name = res.headers
          .get('Content-Disposition')
          .split('filename=')[1];
        return { blob, name } as DownloadFile;
      } catch (e) {
        return {
          id: this.jwt?.id,
          error: [
            'Unhandle Exception Occur while downloading cursor package.',
            JSON.stringify(e)
          ]
        } as DownloadError;
      }
    } else if (res.status === 400) {
      const data = await res.json();
      return data as DownloadError;
    } else {
      return {
        id: this.jwt?.id,
        error: ['Internal Error Occur while downloading cursor package.']
      } as DownloadError;
    }
  }
}
