import PartyOptions from '@/src/components/PartyOptions';
import { HonorOfConduct } from '@/src/components/HonorOfConduct';
import GameSelect from '@/src/components/GameSelect';
import { useState } from 'react';
import Button from '@/src/components/Button';
import { useAtom } from 'jotai';
import { partyFinderAtom } from '@/src/atoms/partyFinderAtom';
import Link from 'next/link';

export default function PartyFinder() {
  const [pageNumber, setPageNumber] = useState(1);
  const [survey, setSurvey] = useAtom(partyFinderAtom);

  return (
    <div className="w-[59.375rem] h-[53.125rem] border-solid border p-16 relative left-[19%] top-[8%] rounded-[.625rem]">
      <div className="flex justify-between mb-[2.62rem]">
        <h1 className="text-2xl font-medium">Question {pageNumber} of 3</h1>
        <h1 className="text-pink-500 text-2xl font-medium">Required</h1>
      </div>
      {pageNumber === 1 && <PartyOptions />}
      {pageNumber === 2 && <HonorOfConduct />}
      {pageNumber === 3 && <GameSelect />}
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
          survey.honorConduct === true && survey.games?.length !== 0 && pageNumber === 3
            ? survey.partyOption + ''
            : ''
        }
      >
        <Button
          buttonType="primary"
          className="w-[7.5rem] absolute bottom-16 right-16"
          onClick={() => {
            if (pageNumber != 3) setPageNumber(pageNumber + 1);
          }}
        >
          Next
        </Button>
      </Link>
    </div>
  );
}
