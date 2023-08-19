import React, { useEffect, useState } from "react";
import DevLayout from "@/src/components/layouts/DevLayout";
import Button from "@/src/components/Button";
import Link from "next/link";
import protectedGetServerSideProps from "@/src/utils/protectRoute";
import { useSession } from "next-auth/react";
import { ILobbyPopulated } from "@/src/models/Lobby";

export const getServerSideProps = protectedGetServerSideProps;

const LobbyDevPage = () => {
  const { data, status } = useSession();

  const [lobbies, setLobbies] =
    useState<ILobbyPopulated[]>([]);

  function fetchLobbies() {
    fetch("/api/lobbies").then(res => res.json())
      .then(lobbies => setLobbies(lobbies));
  }

  // fetch on initialization
  useEffect(() => {
    fetchLobbies();
  }, []);

  function handleDelete(lobbyId: string) {
    fetch(`/api/lobbies/${lobbyId}`, {
      method: "DELETE"
    }).then(res => {
      if (res.status === 200)
        fetchLobbies();
    });
  }

  return (
    <main>
      <h1>
        Lobby
      </h1>

      <div className={"mt-4"}>
        <Link href={"/dev-pages/lobbies/create"}>
          <Button>Create Lobby</Button>
        </Link>
      </div>

      <h3 className={"mt-4"}>
        All Lobbies
      </h3>

      <div className={"flex"}>
        {lobbies.map(lobby => (
          <div key={lobby._id.toString()} className={"bg-mediumGrey px-10 py-8"} style={{ borderRadius: 20 }}>
            <small>{lobby.game.toUpperCase()}</small>
            <h4>{lobby.name}</h4>
            <div>{lobby.description}</div>
            <div>Users: {lobby.users.map(user => <>{`${user.username}#${user.tag}`}</>)}</div>
            <div className={"flex gap-2"}>
              <Link href={`lobbies/${lobby._id.toString()}`}>
                <Button icon={"carat_right"}>
                  View
                </Button>
              </Link>

              {lobby.hostId.toString() === data?.id ? (
                <Button icon={"deny_small"} onClick={() => handleDelete(lobby._id.toString())}>
                  Delete
                </Button>
              ) : <></>}

            </div>
          </div>
        ))}
      </div>

    </main>
  );
};

LobbyDevPage.getLayout = DevLayout.getLayout("/dev-pages");

export default LobbyDevPage;