import React, { useEffect, useState } from "react";
import DevLayout from "@/components/layouts/DevLayout";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select, { Option } from "@/components/Select";
import { Game } from "@prisma/client";

// :)
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const PartyDevPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game>();

  useEffect(() => {
    fetch("/api/games").then(res => res.json())
      .then(games => setGames(games));
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

  async function handleCreateParty(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const res = await fetch(`/api/party`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
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
        Party
      </h1>

      <h3 className={"mt-4"}>
        Create Party
      </h3>
      <form className={"p-4"} onSubmit={handleCreateParty}>
        <label>Name of Lobby</label><br />
        <Input className={"mt-2 mb-4"} placeholder={"Jane's Lobby"} name={""}
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
          Create Party
        </Button>
      </form>

      <h3 className={"mt-4"}>
        All Parties
      </h3>
    </main>
  );
};

PartyDevPage.getLayout = DevLayout.getLayout("/dev-pages");

export default PartyDevPage;