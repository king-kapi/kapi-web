import CustomizeDashboard from '@/components/CustomizeDashboard';
import LoginStatus from '@/components/LoginStatus';
import { protectedGetServerSideProps } from '@/components/ProtectedRoute';
import { Notification } from '@/src/models/Notification';
import Head from 'next/head';
import NotificationBubble from '../components/NotificationBubble';
import SearchBar from '../components/SearchBar';
import SideNav from '../components/SideNav';

export const getServerSideProps = protectedGetServerSideProps;

export default function Home() {
  const notifications: Notification[] = [
    {
      icon: 'mingcute:trophy-fill',
      messageHighlight: 'Wowow you just got a trophy!',
      mainMessage: '',
      timestamp: 25,
      partySize: undefined,
      maxPartySize: undefined,
    },
    {
      icon: 'mdi:thumb-up',
      messageHighlight: '@thisandthat',
      mainMessage: 'from liked your post',
      timestamp: 62,
      partySize: undefined,
      maxPartySize: undefined,
    },
    {
      icon: 'icon-park-solid:game-handle',
      messageHighlight: '@soandso',
      mainMessage: 'joined your game lobby',
      timestamp: 134,
      partySize: 3,
      maxPartySize: 4,
    },
  ];
  return (
    <>
      <Head>
        <title>Project Design Thriving</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LoginStatus />
        <SideNav />
        <SearchBar />
        <CustomizeDashboard />
        {notifications.map((notification, index) => (
          <NotificationBubble key={index} notification={notification} />
        ))}
      </main>
    </>
  );
}