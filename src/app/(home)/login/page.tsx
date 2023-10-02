'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
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
