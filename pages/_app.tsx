import '@/styles/globals.css';
import { getServerSession } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { authOptions } from './api/auth/[...nextauth]';

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  console.log('hi');

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
