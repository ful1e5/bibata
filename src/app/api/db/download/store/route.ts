import { NextRequest, NextResponse } from 'next/server';

import { AddDownloadData, addDownload } from '@services/download';
import { decodeAuthToken } from '@utils/auth/token';

import { JWTToken } from 'bibata/misc';

import { RESPONSES as res } from '@api/config';

export async function POST(request: NextRequest) {
  if (request.method === 'POST') {
    let auth: JWTToken | undefined;

    const token = request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) return res.unauth;

    try {
      auth = decodeAuthToken(token);
    } catch {
      return res.invalid_auth_token;
    }

    if (!auth) return res.invalid_auth_token;

    try {
      const data = (await request.json()) as AddDownloadData['data'];
      await addDownload({ id: auth.id, data });
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error(error);
      return res.invalid_request;
    }
  } else {
    return res.invalid_method;
  }
}
