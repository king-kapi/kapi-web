import Input from '@/src/components/Input';
import { partyFinderAtom } from '../atoms/partyFinderAtom';
import { useAtom } from 'jotai';

export default function LobbyCard() {
  const [survey, setSurvey] = useAtom(partyFinderAtom);

  return (
    <div>
      <h1 className="text-[2.25rem] font-semibold">Let’s create a Lobby card for you</h1>
      <h2 className="text-[1.5rem] font-normal my-7">Edit your role, experience, and nickname</h2>
      <div className="w-[31.25rem]">
        <h3 className="text-[1rem] font-semibold mb-[.5rem]">Nickname</h3>
        <Input
          placeholder={'What do you want to be called'}
          onChange={x => {
            setSurvey({ ...survey, nickname: x.target.value });
          }}
        />
      </div>
      <div className="w-[31.25rem] mt-[1.4rem]">
        <h3 className="text-[1rem] font-semibold mb-[.5rem]">In Game Name</h3>
        <Input
          placeholder={'This is not shown until you join the lobby'}
          onChange={x => {
            setSurvey({ ...survey, inGameName: x.target.value });
          }}
        />
      </div>
      <div className="w-[31.25rem] mt-[1.4rem]">
        <h3 className="text-[1rem] font-semibold mb-[.5rem]">Experience (Optional)</h3>
        <Input placeholder={'Level, rank, etc.'} />
      </div>
      <div className="w-[31.25rem] mt-[1.4rem]">
        <h3 className="text-[1rem] font-semibold mb-[.5rem]">Role (Optional)</h3>
        <Input placeholder={'Role, position, etc.'} />
      </div>
    </div>
  );
}
