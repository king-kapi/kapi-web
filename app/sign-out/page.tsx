"use client"

import EmptyLayout from "@/src/components/layouts/EmptyLayout";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const SignOutPage = () => {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/sign-out', {
      method: 'POST'
    }).then(() => {
      // noinspection JSIgnoredPromiseFromCall
      router.push("/login");
    })
  }, [router]);

  return <></>;
}

SignOutPage.getLayout = EmptyLayout.getLayout;

export default SignOutPage;