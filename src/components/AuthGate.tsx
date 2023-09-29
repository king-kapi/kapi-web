import {PropsWithChildren, useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";


const AuthGate = ({children}: PropsWithChildren) => {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  const notLoggedIn = useCallback(() => {
    // noinspection JSIgnoredPromiseFromCall
    router.push("/login");
  }, [router]);

  // auth when mounted
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/users/me");
      if (!res.ok) {
        notLoggedIn();
        return;
      }

      const body = res.json();
      console.log(body);

      setAuthenticated(true);
    })();
  }, [notLoggedIn]);

  if (!authenticated)
    return <></>;
  else
    return children;
}

export default AuthGate;