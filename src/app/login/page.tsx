'use client';

import '@app/(home)/globals.css';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <main>
      <h2 className='text-4xl font-semibold mb-4'>Login Page</h2>
      <button
        className='bg-gray-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-xl inline-flex items-center'
        onClick={() => signIn('github', { callbackUrl: '/' })}>
        Sign in with Github
      </button>
    </main>
  );
}
