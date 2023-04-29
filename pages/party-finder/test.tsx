import LoginStatus from '@/components/LoginStatus';
import UserProfile from '@/src/types/UserProfile';
import protectedGetServerSideProps from '@/src/utils/protectRoute';
import Link from 'next/link';

export const getServerSideProps = protectedGetServerSideProps;

export default function PartyFinderTest({ user }: { user: UserProfile }) {

  return (
    <>
      <main>
        <LoginStatus />
        <h1>Requests</h1>

        {user.lobbyRequests.length === 0 ? "Currently no requests." :
          user.lobbyRequests.map(request => (
            <div key={request.partyId.toString()}>
              <h5>{request.party.game} {request.party.users?.length}/{request.party.maxSize}</h5>
              <button>
                Accept
              </button>
              <button>
                Deny
              </button>
            </div>
          ))}

        <h1>Create lobby</h1>

        <Link href={"/party-finder/create"}>
          <button>
            Create!
          </button>
        </Link>

        <h1>Current lobby</h1>

        {user.currentLobby ? <div>
          {JSON.stringify(user.currentLobby)}
          <Link href={`/party-finder/${user.currentLobby}`}>
            <button>See Party</button>
          </Link>
        </div> : "No lobby atm."}
      </main>
    </>
  );
}