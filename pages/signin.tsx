import { signIn } from 'next-auth/react';
import React from 'react';

export default function Login() {
  return (
    <>
      <main>
        Sign in page
        <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          signIn();
        }}>Click here to sign in</button>
      </main>
    </>
  );
}
