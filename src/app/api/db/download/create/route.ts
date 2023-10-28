import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  if (request.method === 'POST') {
    const token = request.headers.get('Authorization');
    try {
      const data = await request.json();
      return NextResponse.json({ data });
    } catch (error) {
      return NextResponse.json({ satus: 400, error: 'Invalid JSON data' });
    }
  } else {
    return NextResponse.json({ status: 405, error: 'Method not allowed' });
  }
}
