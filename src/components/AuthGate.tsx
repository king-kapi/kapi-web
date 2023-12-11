import {PropsWithChildren, useCallback, useEffect, useState} from "react";
import {useSetAtom} from "jotai";
import meAtom from "@/src/atoms/meAtom";
import User from "../types/User";
import {useRouter} from "next/navigation";

const AuthGate = ({children}: PropsWithChildren) => {
  const [authenticated, setAuthenticated] = useState(false);
  const setMe = useSetAtom(meAtom);
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

      const me = await res.json() as User;
      setMe(me);

      setAuthenticated(true);
    })();
  }, [notLoggedIn, setMe]);

  if (!authenticated)
    return <></>;
  else
    return children;
}

export default AuthGate;