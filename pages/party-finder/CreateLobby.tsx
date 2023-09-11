import Icon from '@/src/components/icons/Icon';
import { useState } from 'react';
import styles from '@/src/styles/BuddyFinder.module.css';
import Link from 'next/link';
import { HonorOfConduct } from '@/src/components/HonorOfConduct';
import GameSelect from '@/src/components/GameSelect';
import Button from '@/src/components/Button';
import { partyFinderAtom } from '@/src/atoms/partyFinderAtom';
import { useAtom } from 'jotai';
import LobbyDescription from '@/src/components/LobbyDescription';
import LobbyRepresentation from '@/src/components/LobbyRepresentation';
import LobbyCard from '@/src/components/LobbyCard';

export default function PartyFinderPage() {
  const [survey, setSurvey] = useAtom(partyFinderAtom);
  const [pageNumber, setPageNumber] = useState(1);
  return (
    <div className={'px-16 py-12'}>
      <Link className={styles.PartyFinder} href="/party-finder">
        <div className={'flex items-center'}>
          <div className={'w-[1.875rem] h-[1.875rem] bg-grey rounded-full flex-center'}>
            <Icon icon={'carat_left'} />
          </div>
          <Icon icon={'party_finder'} size={3.4375} className={'ml-6'} />
          <span className={'ml-1 font-medium'}>Party Finder</span>
        </div>
      </Link>
      {pageNumber !== 6 ? (
        <div className="w-[59.375rem] h-[53.125rem] border-solid border p-16 absolute left-[32%] top-[11%] rounded-[.625rem]">
          <div className="flex justify-between mb-[2.62rem]">
            <h1 className="text-2xl font-medium">Question {pageNumber}</h1>
            <h1
              className={
                pageNumber !== 4 && pageNumber !== 5
                  ? 'text-pink-500 text-2xl font-medium'
                  : 'text-blue-700 text-2xl font-medium'
              }
            >
              {pageNumber !== 4 && pageNumber !== 5 ? 'Required' : 'Optional'}
            </h1>
          </div>
          {pageNumber === 1 && <HonorOfConduct />}
          {pageNumber === 2 && <GameSelect />}
          {pageNumber === 3 && <LobbyDescription />}
          {pageNumber === 4 && <LobbyRepresentation />}
          {pageNumber === 5 && <LobbyCard />}
          <Link href={pageNumber === 1 ? '/party-finder' : ''}>
            <Button
              buttonType="secondary"
              className="w-[7.5rem] absolute bottom-16"
              onClick={() => {
                if (pageNumber != 1) setPageNumber(pageNumber - 1);
              }}
            >
              Back
            </Button>
          </Link>
          <Button
            buttonType={
              (pageNumber === 1 && survey.honorConduct) ||
              (pageNumber === 2 && survey.games?.length != 0) ||
              (pageNumber === 3 &&
                survey.lobbyName &&
                survey.lobbySize &&
                survey.lobbyDescription) ||
              pageNumber === 4 ||
              pageNumber === 5
                ? 'primary'
                : 'secondary'
            }
            className="w-[7.5rem] absolute bottom-16 right-16"
            onClick={() => {
              if (
                (pageNumber != 6 &&
                  ((pageNumber === 1 && survey.honorConduct) ||
                    (pageNumber === 2 && survey.games?.length !== 0) ||
                    (pageNumber === 3 &&
                      survey.lobbyName &&
                      survey.lobbySize &&
                      survey.lobbyDescription))) ||
                pageNumber === 4 ||
                pageNumber === 5
              )
                setPageNumber(pageNumber + 1);
            }}
          >
            Next
          </Button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
