import Input from '@/src/components/Input';
import { useQuery } from 'react-query';
import KapiListbox from './KapiListbox';
import { partyFinderAtom } from '../atoms/partyFinderAtom';
import { useAtom } from 'jotai';

export default function LobbyDescription() {
  const [survey, setSurvey] = useAtom(partyFinderAtom);
  const { data, isLoading, isError, error } = useQuery('userInfo', () =>
    fetch(`/api/users/current`).then(res => res.json())
  );
  function numPlayers() {
    let arr = [];
    for (let i = 0; i < 12; i++)
      arr[i] = {
        text: <div className={'flex items-center gap-2 whitespace-nowrap'}>{i + 1}</div>,
        value: i + 1,
      };

    return arr;
  }

  function setName(x: String) {
    setSurvey({ ...survey, lobbyName: x });
  }

  function setDescription(x: String) {
    setSurvey({ ...survey, lobbyDescription: x });
  }

  function setSize(x: Number) {
    setSurvey({ ...survey, lobbySize: x });
  }
  return (
    <div>
      <h1 className="text-[2.25rem] font-semibold">Let's create a lobby for you.</h1>
      <h2 className="text-[1.5rem] font-normal my-7">Feel free to customize your lobby!</h2>
      <div className="flex justify-between w-[10]">
        <div className="w-[32rem]">
          <h3 className="text-[1rem] font-semibold mb-[1rem]">Name of Lobby</h3>
          <Input placeholder={data.username + "'s Lobby"} onChange={x => setName(x.target.value)} />
        </div>
        <div className="w-[13.25rem]">
          <h3 className="text-[1rem] font-semibold mb-[1rem] ">Number of Players</h3>
          <KapiListbox
            placeholder="#"
            className={'w-[13.25rem]'}
            options={numPlayers()}
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
