import { useSession } from "next-auth/react"
import Link from "next/link";
import Card from "./Card";

export default function LoginStatus() {
  const { data, status } = useSession();

  return (
    <Card>
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
      <Link href={"/logout"}>
        <button>
          Logout
        </button>
      </Link>
    </Card >
  )
}