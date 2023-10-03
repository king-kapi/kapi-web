import DevLayout from "@/src/components/layouts/DevLayout";
import {atomsWithMutation, atomsWithQuery} from "jotai-tanstack-query";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";
import React, {useCallback, useRef} from "react";
import {useAtom} from "jotai";
import {IGame} from "@/src/models/Games";

const [, gamesStatusAtom] = atomsWithQuery(() => ({
  queryKey: ["devAllGames"],
  queryFn: async () => {
    const res = await fetch('/api/games');
    if (!res.ok)
      throw await res.json();
    return await res.json() as IGame[];
  }
}));

const [, createGameStatusAtom] = atomsWithMutation(() => ({
  mutationKey: ["devCreateGame"],
  mutationFn: async (game: Partial<IGame>) => {
    const res = await fetch('/api/games', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(game)
    });

    if (!res.ok)
      throw await res.json();
    return await res.json() as IGame;
  }
}));

const [, deleteGameStatusAtom] = atomsWithMutation(() => ({
  mutationKey: ["devDeleteGame"],
  mutationFn: async (tagId: string) => {
    const res = await fetch(`/api/games/${tagId}`, {
      method: "DELETE"
    });

    if (!res.ok)
      throw await res.text();
    return await res.text();
  }
}));

const GamesDevPage = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [gamesStatus, dispatchGames] = useAtom(gamesStatusAtom);
  const [createGameStatus, createGame] = useAtom(createGameStatusAtom);
  const [deleteGameStatus, deleteGame] = useAtom(deleteGameStatusAtom);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string | undefined;
    const image = formData.get("image") as string | undefined;
    const numPlayers = formData.get("numPlayers") as string | undefined;
    const _numPlayers: number[] = [];

    if (!name || !image || !numPlayers) return;

    for (let i = 1; i <= parseInt(numPlayers); i++) {
      _numPlayers.push(i);
    }

    await createGame([{
      name,
      image,
      numPlayers: _numPlayers
    }]);

    if (formRef.current)
      formRef.current.reset();

    dispatchGames({type: "refetch"});
  }, [createGame, dispatchGames]);

  const handleDelete = useCallback(async (tagId: string) => {
    await deleteGame([tagId]);

    dispatchGames({type: "refetch"});
  }, [deleteGame, dispatchGames]);

  return (
    <div>
      <h2>All Games</h2>
      <div className={"flex flex-wrap gap-2 mt-2"}>
        {gamesStatus.data && gamesStatus.data.map(game => (
          <div
            className={"flex flex-col rounded-xl bg-mediumGrey"}
            key={game._id.toString()}>
            <div className={"h-[8rem] w-[14rem] bg-darkGrey rounded-t-xl bg-cover bg-center"} style={{
              backgroundImage: `url(${game.image})`
            }}/>
            <div className={"p-4"}>
              <div className={"description-strong uppercase"}>{game.name}</div>
              <div className={"description-strong"}>Players:</div>
              <div>{game.numPlayers.map(num => `${num} `)}</div>
              <div className={"mt-2"}>
                <Button buttonType={"transparent"} icon={"deny_default"}
                        onClick={() => handleDelete(game._id.toString())}>Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className={"mt-8"}>Create Game</h2>

      <p>Go to <a
        href={"https://s3.console.aws.amazon.com/s3/buckets/designthriving-content?region=us-east-1&tab=objects"}
        target={"_blank"}>https://s3.console.aws.amazon.com/s3/buckets/designthriving-content?region=us-east-1&tab=objects</a> to
        upload images</p>

      <form className={"w-full max-w-xl flex flex-col mt-4 gap-4"} onSubmit={handleSubmit} ref={formRef}>
        <div className={"w-full"}>
          <label>Game Name</label>
          <Input name={"name"} className={"w-full"}/>
        </div>

        <div>
          <label>Image URL</label>
          <Input name={"image"} className={"w-full"}/>
        </div>

        <div>
          <label>Number of Max Players</label>
          <Input name={"numPlayers"} className={"w-full"} type={"number"}/>
        </div>

        <div>
          <Button type={"submit"}>
            {createGameStatus.isLoading ? "Loading" : "Create"}
          </Button>
        </div>
      </form>
    </div>
  )
}

GamesDevPage.getLayout = DevLayout.getLayout("/dev-pages");

export default GamesDevPage;