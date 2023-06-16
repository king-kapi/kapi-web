import DevLayout from "@/components/layouts/DevLayout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Prisma, User } from "@prisma/client";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";

// TODO: put this in a exported type
const lobbyWithUserAndRequests = Prisma.validator<Prisma.LobbyArgs>()({
  include: {
    users: true, requests: {
      include: {
        sender: true
      }
    }
  }
});
type LobbyWithUserAndRequests = Prisma.LobbyGetPayload<typeof lobbyWithUserAndRequests>;

const ViewLobbyDev = () => {
  const { data, status } = useSession();
  const user = data;

  const router = useRouter();
  const lobbyId = router.query.lobbyId as string;

  const [lobby, setLobby] = useState<LobbyWithUserAndRequests>();
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

  function handleKick(kickId: string) {
    fetch(`/api/lobbies/${lobbyId}/kick/${kickId}`, {
      method: 'POST'
    }).then(res => {
      if (res.ok)
        fetchLobby();
    });
  }

  function handleSendRequest() {
    fetch(`/api/lobbies/${lobbyId}/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "This is a test message."
      })
    }).then(res => {
      if (res.status === 201)
        fetchLobby();
    });
  }

  function handleAccept(requestId: string) {
    fetch(`/api/lobbies/${lobbyId}/request/${requestId}/accept`, {
      method: "POST"
    })
      .then(res => {
        if (res.ok)
          fetchLobby();
      });
  }

  function handleDeny(requestId: string) {
    fetch(`/api/lobbies/${lobbyId}/request/${requestId}/deny`, {
      method: "POST"
    })
      .then(res => {
        if (res.ok)
          fetchLobby();
      });
  }


  return (
    <main>
      <small className={"mt-4"}>{lobbyId}</small>
      <h1>
        {lobby ? lobby.name : "Loading..."}
      </h1>

      {lobby && users && user ? (
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
                &nbsp;
                &nbsp;
                <span className={"underline cursor-pointer"}
                      onClick={() => handleKick(user.id)}>Kick</span>
              </ol>
            )}
          </ul>

          <h2>Requests</h2>
          <div className={"flex gap-4"}>
            {lobby.requests.map(request =>
              <div className={"bg-mediumGrey p-4 rounded-xl"} key={request.id}>
                From {request.sender?.username}#{request.sender?.tag}
                <br />
                Message: {request.message}
                <div className={"flex gap-2 mt-2"}>
                  <Button onClick={() => handleAccept(request.id)}>
                    Accept
                  </Button>
                  <Button onClick={() => handleDeny(request.id)}>
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </div>

          <h2>Actions</h2>

          {lobby.hostId === user.id ? (
            // host view
            <>
              None
            </>
          ) : (
            // other view
            <>
              <Button onClick={handleSendRequest}>Send Join Request</Button>
            </>
          )}

          <div style={{ opacity: 0.2 }}>
            <h3 className={"mt-4"}>Available Users (DO NOT USE)</h3>
            {users.map(user => {
                // remove users already in the party
                if (lobby.users.filter(u => u.id === user.id).length > 0)
                  return;

                return <div key={user.id}>
                  {user.username}#{user.tag}
                  <br />
                  <Button>
                    Send Request
                  </Button>
                </div>;
              }
            )}
          </div>
        </>
      ) : <></>}
    </main>
  );
};

ViewLobbyDev.getLayout = DevLayout.getLayout("/dev-pages/lobbies");

export default ViewLobbyDev;