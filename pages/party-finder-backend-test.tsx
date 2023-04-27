import LoginStatus from '@/components/LoginStatus';
import protectedGetServerSideProps from '@/src/utils/protectRoute';

export const getServerSideProps = protectedGetServerSideProps;

export default function Home() {
  return (
    <>
      <main>
        <LoginStatus/>
        <h1>Requests</h1>
        <h1>Create party</h1>
      </main>
    </>
  );
}