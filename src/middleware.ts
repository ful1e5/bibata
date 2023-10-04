import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const p = req.nextUrl.pathname;
  const token = await getToken({ req });
  const isAuth = !!token;

  if (isAuth) {
    if (p.startsWith('/login') || p === '/') {
      return NextResponse.redirect(new URL('/create', req.url));
    }
  }
}

export const config = { matcher: ['/', '/login'] };
