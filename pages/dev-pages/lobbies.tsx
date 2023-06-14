import React, { useEffect, useState } from "react";
import DevLayout from "@/components/layouts/DevLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select, { Option } from "@/components/Select";
import { Game, Prisma } from "@prisma/client";

// :)
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const lobbyWithUsers = Prisma.validator<Prisma.LobbyArgs>()({
  include: { users: true }
});
type LobbyWithUsers = Prisma.LobbyGetPayload<typeof lobbyWithUsers>;

const LobbyDevPage = () => {
  // game stuff
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game>();

  const [lobbies, setLobbies] =
    useState<LobbyWithUsers[]>([]);

  function fetchGames() {
    fetch("/api/games").then(res => res.json())
      .then(games => setGames(games));
  }

  function fetchLobbies() {
    fetch("/api/lobbies").then(res => res.json())
      .then(lobbies => setLobbies(lobbies));
  }

  // fetch on initialization
  useEffect(() => {
    fetchGames();
    fetchLobbies();
  }, []);

  // form stuff
  function handleGameSelect(e: React.FormEvent<HTMLSelectElement>) {
    // find game
    let selectedGame;
    for (const game of games) {
      if (game.id === e.currentTarget.value) {
        selectedGame = game;
        break;
      }
    }

    setSelectedGame(selectedGame);
  }

  async function handleCreateLobby(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const res = await fetch(`/api/lobbies`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        name: data.get("name"),
        game: data.get("game"),
        numPlayers: Number(data.get("numPlayers")),
        description: data.get("description")
      })
    });
    console.log(await res.json());
  }

  const gameOptions: Option[] = games.map(({ id, name }) => ({
    text: name,
    value: id
  }));

  let playerOptions: Option[] | undefined;
  if (selectedGame)
    playerOptions = selectedGame.numPlayers.map(players => ({
      text: players.toString(),
      value: players.toString()
    }));

  return (
    <main>
      <h1>
        Lobby
      </h1>

      <h3 className={"mt-4"}>
        Create Lobby
      </h3>
      <form className={"p-4"} onSubmit={handleCreateLobby}>
        <label>Name of Lobby</label><br />
        <Input className={"mt-2 mb-4"} placeholder={"Jane's Lobby"} name={"name"}
               style={{ width: "100%", maxWidth: 800 }} />

        <br />

        <label className={""}>
          Game
        </label><br />
        <Select className={"mt-2 mb-4"}
                name="game"
                placeholder={"Select Game"}
                options={gameOptions} style={{ maxWidth: 800 }}
                onChange={handleGameSelect} />

        <br />

        <label>
          Number of Players
        </label><br />
        <Select className={"mt-2 mb-4"}
                name="numPlayers"
                placeholder={"Select Number of Players"}
                disabled={!selectedGame}
                options={selectedGame ? playerOptions : []} style={{ maxWidth: 800 }} />

        <br />

        <label>
          Lobby Description
        </label><br />
        <Input className={"mt-2 mb-4"}
               placeholder={loremIpsum}
               element={"textarea"}
               name={"description"}
               style={{ minHeight: 120, width: "100%", maxWidth: 800 }} />

        <br />

        <Button className={"mt-4"} type={"submit"} buttonSize={"large"}>
          Create Lobby
        </Button>
      </form>

      <h3 className={"mt-4"}>
        All Lobbies
      </h3>

      {lobbies.map(lobby => (
        <div key={lobby.id}>
          <h4>{lobby.name}</h4>
          <div>{lobby.description}</div>
          <div>Users: {lobby.users.map(user => <>{`${user.username}#${user.tag}`}</>)}</div>
        </div>
      ))}


    </main>
  );
};

LobbyDevPage.getLayout = DevLayout.getLayout("/dev-pages");

export default LobbyDevPage;