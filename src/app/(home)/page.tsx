'use client';

import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

import Link from 'next/link';

import { authOptions } from '@api/auth/[...nextauth]/route';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session !== null) {
    return redirect('/create');
  } else {
    return (
      <>
        <h1>Bibata Live</h1>
        <Link href='/login'>Sign In</Link>
        <main>Bibata.live App is Running</main>
      </>
    );
  }
}
