import Input from '@/src/components/Input';
import { useAtom, useAtomValue } from 'jotai';
import meAtom from '@/src/atoms/meAtom';
import createLobbyAtom from '@/src/atoms/createLobbyAtom';
import KapiListbox from '@/src/components/KapiListbox';
import { Option } from '@/src/components/Select';
import { gamesStatusAtom } from '@/src/atoms/gamesAtom';
import { useMemo } from 'react';
import { IGame } from '@/src/models/Games';

export default function CreateLobbyDescription() {
  const [lobby, setLobbyAtom] = useAtom(createLobbyAtom);
  const me = useAtomValue(meAtom);
  const selectedGameId = lobby.game;
  const gamesStatus = useAtomValue(gamesStatusAtom);
  const games = gamesStatus.data;

  function setName(name: string) {
    setLobbyAtom({
      ...lobby,
      name,
    });
  }

  function setDescription(description: string) {
    setLobbyAtom({
      ...lobby,
      description,
    });
  }

  function setSize(size: number) {
    setLobbyAtom({
      ...lobby,
      numPlayers: size,
    });
  }

  const playerOptions: Option[] | undefined = useMemo(() => {
    let playerOptions: Option[] | undefined;
    if (selectedGameId && games) {
      let selectedGame: IGame | undefined;
      console.log('foo');
      for (const game of games) {
        if (game._id.toString() === selectedGameId) selectedGame = game;
      }

      if (selectedGame)
        playerOptions = selectedGame.numPlayers.map(players => ({
          text: players.toString(),
          value: players.toString(),
        }));
    }

    return playerOptions;
  }, [selectedGameId, games]);

  return (
    <div>
      <h1 className="text-[2.25rem] font-semibold">Let{"'"}s create a lobby for you.</h1>
      <h2 className="text-[1.5rem] font-normal my-7">Feel free to customize your lobby!</h2>
      <div className="flex justify-between w-[10]">
        <div className="w-[32rem]">
          <h3 className="text-[1rem] font-semibold mb-[1rem]">Name of Lobby</h3>
          <Input placeholder={me?.username + "'s Lobby"} onChange={x => setName(x.target.value)} />
        </div>
        <div className="w-[13.25rem]">
          <h3 className="text-[1rem] font-semibold mb-[1rem] ">Number of Players</h3>
          <KapiListbox
            placeholder="#"
            className={'w-[13.25rem]'}
            options={playerOptions || []}
            onChange={x => setSize(Number(x))}
          />
        </div>
      </div>
      <div className="w-[100%] mt-[2.5rem]">
        <h3 className="text-[1rem] font-semibold mb-[1rem]">Lobby Description</h3>
        <textarea
          className="w-full h-[15rem] rounded-xl resize-none bg-mediumGrey placeholder-greyText py-[.75rem] px-[1rem] font-normal"
          onChange={x => setDescription(String(x.target.value))}
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></textarea>
      </div>
    </div>
  );
}
