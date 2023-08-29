import PartyOptions from '@/src/components/PartyOptions';
import { HonorOfConduct } from '@/src/components/HonorOfConduct';
import GameSelect from '@/src/components/GameSelect';
import { useState } from 'react';
import Button from '@/src/components/Button';
import { useAtom } from 'jotai';
import { partyFinderAtom } from '@/src/atoms/partyFinderAtom';
import Link from 'next/link';
import InterestMatch from '@/src/components/InterestMatch';
import TimeZone from '@/src/components/TimeZone';
import InvitationMessage from '@/src/components/InvitationMessage';

export default function PartyFinder() {
  const [pageNumber, setPageNumber] = useState(1);
  const [survey, setSurvey] = useAtom(partyFinderAtom);

  return (
    <div className="w-[59.375rem] h-[53.125rem] border-solid border p-16 relative left-[19%] top-[8%] rounded-[.625rem]">
      <div className="flex justify-between mb-[2.62rem]">
        <h1 className="text-2xl font-medium">Question {pageNumber}</h1>
        <h1 className="text-pink-500 text-2xl font-medium">Required</h1>
      </div>
      {pageNumber === 1 && <PartyOptions />}
      {pageNumber === 2 && <HonorOfConduct />}
      {pageNumber === 3 && <GameSelect />}
      {pageNumber === 4 && <InterestMatch />}
      {pageNumber === 5 && <TimeZone />}
      {pageNumber === 6 && <InvitationMessage />}
      <Button
        buttonType="secondary"
        className="w-[7.5rem] absolute bottom-16"
        onClick={() => {
          if (pageNumber != 1) setPageNumber(pageNumber - 1);
        }}
      >
        Back
      </Button>
      <Link
        href={
          survey.honorConduct === true &&
          survey.games?.length !== 0 &&
          ((pageNumber === 3 && survey.partyOption === '/party-finder/LobbyFinder') ||
            (pageNumber === 6 && survey.partyOption === '/party-finder/BuddyFinder'))
            ? survey.partyOption + ''
            : ''
        }
      >
        <Button
          buttonType={
            (pageNumber === 1 && survey.partyOption) ||
            (pageNumber === 2 && survey.honorConduct) ||
            (pageNumber === 3 && survey.games?.length != 0) ||
            (pageNumber === 4 && survey.interestMatch != null) ||
            pageNumber === 5 ||
            pageNumber === 6
              ? 'primary'
              : 'secondary'
          }
          className="w-[7.5rem] absolute bottom-16 right-16"
          onClick={() => {
            if (
              pageNumber != 6 &&
              ((pageNumber === 1 && survey.partyOption) ||
                (pageNumber === 2 && survey.honorConduct) ||
                (pageNumber === 3 && survey.games?.length != 0) ||
                (pageNumber === 4 && survey.interestMatch != null) ||
                pageNumber === 5 ||
                pageNumber === 6)
            )
              setPageNumber(pageNumber + 1);
          }}
        >
          Next
        </Button>
      </Link>
    </div>
  );
}
