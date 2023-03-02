import '@/styles/globals.css';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { authOptions } from './api/auth/[...nextauth]';

// todo: this context is any pls don't do this ;-;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
