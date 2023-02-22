import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Component, useEffect, useState } from 'react';

export default function AuthRedirect({ children }: { children: Component }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const { data: session } = useSession()

    useEffect(() => { // so we can use router
        setAuthorized(session !== undefined || router.pathname === "/login" || router.pathname === "/logout");
    }, [session, router.pathname]);


    if (authorized) // authenticated
        return children;
    else
        router.push("/login");
}