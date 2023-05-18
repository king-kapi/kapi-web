import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function LoginStatus() {
  const { data, status } = useSession();

  return (
    <div className={"rounded-xl dark:bg-grey p-8"}>
      <p>
        Current status: {status}
      </p>
      <p>
        Data: <code>{JSON.stringify(data)}</code>
      </p>
      <Link href={"/signin"}>
        <button>
          Sign In
        </button>
      </Link>
      <br />
      <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signOut();
      }}>
        Logout
      </button>
    </div >
  )
}