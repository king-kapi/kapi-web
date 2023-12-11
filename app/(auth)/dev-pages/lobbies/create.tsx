import DevLayout from "@/src/components/layouts/DevLayout";
import Input from "@/src/components/Input";
import Select, { Option } from "@/src/components/Select";
import Button from "@/src/components/Button";
import React, { useEffect, useState } from "react";
import { IGame } from "@/src/models/Games";
import KapiListbox, { KapiOption } from "@/src/components/forms/KapiListbox";

// :)
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const CreateLobbyDev = () => {
  // game stuff
  const [games, setGames] = useState<IGame[]>([]);
  const [selectedGame, setSelectedGame] = useState<IGame>();

  function fetchGames() {
    fetch("/api/games").then(res => res.json())
      .then(games => setGames(games));
  }

  // fetch on initialization
  useEffect(() => {
    fetchGames();
  }, []);


  // form stuff
  function handleGameSelect(selected: string | null) {
    // find game
    let selectedGame;
    for (const game of games) {
      if (game._id.toString() === selected) {
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
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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

  const gameOptions: KapiOption<string>[] = games.map(({ _id, name }) => ({
    text: name,
    value: _id.toString()
  }));

  let playerOptions: Option[] | undefined;
  if (selectedGame)
    playerOptions = selectedGame.numPlayers.map(players => ({
      text: players.toString(),
      value: players.toString()
    }));

  return (
    <main>
      <h1 className={"mt-4"}>
        Create Lobby
      </h1>
      <form className={"p-4"} onSubmit={handleCreateLobby}>
        <label>Name of Lobby</label><br />
        <Input className={"mt-2 mb-4"} placeholder={"Jane's Lobby"} name={"name"}
               style={{ width: "100%", maxWidth: 800 }} />

        <br />

        <label className={""}>
          Game
        </label><br />
        <KapiListbox className={"mt-2 mb-4"}
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
    </main>
  );
};

CreateLobbyDev.getLayout = DevLayout.getLayout("/dev-pages/lobbies");

export default CreateLobbyDev;