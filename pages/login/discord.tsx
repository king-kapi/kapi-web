import EmptyLayout from "@/src/components/layouts/EmptyLayout";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import Link from "next/link";

const DiscordRedirectPage = () => {
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code === null)
      return;

    fetch(`/api/auth/discord/exchange?code=${searchParams.get("code")}&redirect_uri=http://localhost:3000/login/discord`)
      .then(res => {
        if (!res.ok) {
          setError(true);
        }
        return res.ok
      })
      .then(ok => {
        if (ok)
          location.href = "/"
      })
  }, [searchParams]);

  return <div className={"h-[100vh] flex-center flex-col text-center"}>
    {
      error ? <>
          Something went wrong while logging you in...
          <br/>
          <Link href={"/login"}>Navigate Back</Link>
        </>
        : "Logging you in..."
    }
  </div>
}

DiscordRedirectPage.getLayout = EmptyLayout.getLayout;

export default DiscordRedirectPage;