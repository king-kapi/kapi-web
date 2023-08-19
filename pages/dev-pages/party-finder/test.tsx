import LoginStatus from "@/src/components/LoginStatus";
import UserProfile from "@/src/types/UserProfile";
import protectedGetServerSideProps from "@/src/utils/protectRoute";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@/src/components/Button";

export const getServerSideProps = protectedGetServerSideProps;

export default function PartyFinderTest({ user }: { user: UserProfile }) {
  const router = useRouter();

  async function handleLeaveLobby() {
    await fetch(`/api/lobby/${user.currentLobby?.toString()}/leave`, {
      method: "DELETE"
    });

    router.reload();
  }

  return (
    <main className={"p-8"}>
      <Link href="/dev-pages">
        <button>Back</button>
      </Link>

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

      {!user.currentLobby ? (
        <>
          <h1>Create lobby</h1>

          <Link href={"/party-finder/create"}>
            <Button>
              Create!
            </Button>
          </Link>
        </>
      ) : (
        <>
          <h1>Current lobby</h1>

          <div>
            {JSON.stringify(user.currentLobby)}
            <Link href={`/party-finder/${user.currentLobby}`}>
              <Button>See Party</Button>
            </Link>
          </div>

          <Button onClick={handleLeaveLobby}>Leave Lobby</Button>
        </>
      )}
    </main>
  );
}