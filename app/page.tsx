"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Welcome to EventsPRO</h1>
      {!session && (
        <>
          <p>You are not signed in.</p>
          <button onClick={() => signIn("google")}>
            Sign in with Google
          </button>
        </>
      )}
      {session && (
        <>
          <p>Signed in as {session.user?.email}</p>
          <p>Access Token: {session.accessToken}</p> {/* Display access token */}
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
}
