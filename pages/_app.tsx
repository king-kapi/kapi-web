import "@/styles/globals.css";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth/next";
import { SessionProvider } from "next-auth/react";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import { authOptions } from "./api/auth/[...nextauth]";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { ReactNode } from "react";
import Layout from "@/components/layouts/Layout";

// todo: this context is any pls don't do this ;-;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  }

  return {
    props: {
      session
    }
  };
}

const queryClient = new QueryClient();

export default function App({ Component, pageProps: { session, ...pageProps } }: AppLayoutProps) {
  const getLayout = Component.getLayout || Layout.getLayout;

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </SessionProvider>
  );
}
