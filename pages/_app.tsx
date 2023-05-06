import '@/styles/globals.css';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth/next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { authOptions } from './api/auth/[...nextauth]';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { Session } from 'next-auth';

// ngl this still looks really ugly, but using the function syntax it's worse
export const getServerSideProps: GetServerSideProps<{ session: Session }> = async context => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={new QueryClient()}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
