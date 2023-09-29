'use client';

import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

import { authOptions } from '@api/auth/[...nextauth]/route';

export default async function LoginPage() {
  const param = useSearchParams();
  const callbackUrl = param.get('callbackUrl') || '/';

  const session = await getServerSession(authOptions);
  if (session !== null) {
    return redirect('/create');
  } else {
    return (
      <>
        <h2> Login </h2>
        <h3>Sign in to your account</h3>
        <button onClick={() => signIn('github', { callbackUrl })}>
          Sign in with Github
        </button>
      </>
    );
  }
}
