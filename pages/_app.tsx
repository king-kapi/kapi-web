import "@/src/styles/globals.css";
import {AppLayoutProps} from "next/app";
import {QueryClient, QueryClientProvider} from "react-query";
import React from "react";
import Layout from "@/src/components/layouts/Layout";

export default function App({Component, pageProps}: AppLayoutProps) {
  const getLayout = Component.getLayout || Layout.getLayout;

  return (
    <QueryClientProvider client={new QueryClient()}>
      {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
  );
}
