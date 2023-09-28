"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const param = useSearchParams()
  const callbackUrl= param.get('callbackUrl') || '/'

  return (
    <>
    <h2> Login </h2>
    <h3>Sign in to your account</h3>
    <button onClick={() => signIn("github", { callbackUrl: callbackUrl })}>
      Sign in with Github
    </button>
  </>
  )
}
