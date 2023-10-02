'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <h1>Bibata Live</h1>
      <Link href='/login'>Sign In</Link>
      <main>Bibata.live App is Running</main>
    </>
  );
}
