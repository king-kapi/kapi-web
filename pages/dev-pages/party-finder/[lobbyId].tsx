import Chat from "@/components/Chat";
import LoginStatus from "@/components/LoginStatus";
import Lobby from "@/src/types/Lobby";
import { toUser } from "@/src/types/User";
import UserProfile from "@/src/types/UserProfile";
import protectedGetServerSideProps from "@/src/utils/protectRoute";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const getServerSideProps = protectedGetServerSideProps;

const ViewLobby = ({ user }: { user: UserProfile }) => {
  const router = useRouter();
  const lobbyId = router.query.lobbyId as string;

  const [lobby, setLobby] = useState<Lobby | null>(null);
  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/lobby/${lobbyId}`);
      const lobby = await response.json();
      setLobby(lobby);
    })();
  }, []);

  return (
    <main>
      <LoginStatus />

      <Link href="/dev-pages/party-finder/test">
        <button>Back</button>
      </Link>

      <h1>Lobby: {lobbyId.toString()}</h1>

      {!lobby ? "Loading..." : (
        <>
          <h3>Lobby Information</h3>
          <code style={{ whiteSpace: "pre" }}>
            {JSON.stringify(lobby, null, 2)}
          </code>
          <h3>Chat</h3>
          <Chat chatId={lobby.chatId} user={toUser(user)} />
        </>
      )}
    </main>
  )
}

export default ViewLobby;