import DevLayout from "@/components/layouts/DevLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Prisma, User } from "@prisma/client";
import Button from "@/components/Button";

// TODO: put this in a exported type
const lobbyWithUsers = Prisma.validator<Prisma.LobbyArgs>()({
  include: { users: true }
});
type LobbyWithUsers = Prisma.LobbyGetPayload<typeof lobbyWithUsers>;

const ViewLobbyDev = () => {
  const router = useRouter();
  const lobbyId = router.query.lobbyId as string;

  const [lobby, setLobby] = useState<LobbyWithUsers>();
  const [users, setUsers] = useState<User[]>();

  function fetchLobby() {
    fetch(`/api/lobbies/${lobbyId}`).then(res => res.json())
      .then(lobby => setLobby(lobby));
  }

  function fetchUsers() {
    fetch(`/api/users`).then(res => res.json())
      .then(users => setUsers(users));
  }

  // fetch on initialization
  useEffect(() => {
    if (lobbyId) {
      fetchLobby();
      fetchUsers();
    }
  }, [lobbyId]);

  return (
    <main>
      <small className={"mt-4"}>{lobbyId}</small>
      <h1>
        {lobby ? lobby.name : "Loading..."}
      </h1>

      {lobby && users ? (
        <>
          <h3 className={"mt-2"}>
            Tags
          </h3>
          {lobby.tags.length === 0 ? "No Tags" : <div>Insert code for tags</div>}

          <h3 className={"mt-2"}>
            Description
          </h3>
          {lobby.description}

          <h3 className={"mt-2"}>
            Users
          </h3>
          <ul>
            {lobby.users.map(user =>
              <ol key={user.id}>
                {user.username}#{user.tag}
              </ol>
            )}
          </ul>

          <h3 className={"mt-4"}>Available Users</h3>
          {users.map(user => {
              // remove users already in the party
              if (lobby.users.filter(u => u.id === user.id).length > 0)
                return;

              return <div key={user.id}>
                {user.username}#{user.tag}
                <br/>
                <Button>
                  Send Request
                </Button>
              </div>;
            }
          )}
        </>
      ) : <></>}
    </main>
  );
};

ViewLobbyDev.getLayout = DevLayout.getLayout("/dev-pages/lobbies");

export default ViewLobbyDev;