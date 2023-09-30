'use client';

import { signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

import { authOptions } from '@api/auth/[...nextauth]/route';

export default function LoginPage() {
  const session = getServerSession(authOptions);

  if (session !== null) {
    return redirect('/create');
  } else {
    return (
      <>
        <h2> Login </h2>
        <h3>Sign in to your account</h3>
        <button onClick={() => signIn('github', { callbackUrl: '/' })}>
          Sign in with Github
        </button>
      </>
    );
  }
}
