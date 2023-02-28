import '@/styles/globals.css';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { authOptions } from './api/auth/[...nextauth]';
import { QueryClient, QueryClientProvider } from 'react-query';

// todo: this context is any pls don't do this ;-;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  console.log('hi');

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
}

const queryClient = new QueryClient();

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
