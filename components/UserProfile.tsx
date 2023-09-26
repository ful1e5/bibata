"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import Link from "next/link";

export default function UserProfile() {
  const { data: session, status } = useSession();

  const handleSignOutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    signOut({ callbackUrl: "/" });
  };

  if (status === "loading") return <>Loading...</>;

  if (!session) {
    return <Link href="/login">Sign In</Link>;
  }

  return (
    <>
      ({session?.user?.name}) | <Link href="/studio"> Studio</Link> |
      <a
        href="/api/auth/signout"
        title="Click to SignOut"
        onClick={handleSignOutClick}
      >
        Signout
      </a>
    </>
  );
}
