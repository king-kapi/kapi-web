import "@/src/styles/globals.css";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { SessionProvider } from "next-auth/react";
import { AppLayoutProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import Layout from "@/src/components/layouts/Layout";
import { Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// ngl this still looks really ugly, but using the function syntax it's worse
export const getServerSideProps: GetServerSideProps<{ session: Session }> = async context => {
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
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppLayoutProps) {
  const getLayout = Component.getLayout || Layout.getLayout;


  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={new QueryClient()}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </SessionProvider>
  );
}
