import GameSelect from '@/src/components/GameSelect';
import InterestMatch from '@/src/components/InterestMatch';
import InvitationMessage from '@/src/components/InvitationMessage';
import TimeZone from '@/src/components/TimeZone';
import { ProfilePreview } from '@/src/components/ProfilePreview';
import { HonorOfConduct } from '@/src/components/HonorOfConduct';
import styles from '@/src/styles/BuddyFinder.module.css';
import Icon from '@/src/components/icons/Icon';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Button from '@/src/components/Button';
import { partyFinderAtom } from '@/src/atoms/partyFinderAtom';
import { useAtom } from 'jotai';

export const formContext = React.createContext({});

export type formContent = {
  games: string[];
  interestMatch: boolean;
  timezone: number;
  message: string;
};

export default function BuddyFinder() {
  const [pageNumber, setPageNumber] = useState(1);
  const [mode, setMode] = useState('dark');
  const [survey, setSurvey] = useAtom(partyFinderAtom);
  const [content, setContent] = useState<formContent>({
    games: [],
    interestMatch: true,
    timezone: 0,
    message: '',
  });

  const providerValue = useMemo(() => ({ content, setContent }), [content, setContent]);

  return (
    <div
      className={[
        styles.BuddyFinderContainer,
        `theme-${mode} theme-blue bg-black text-textColor px-16 py-12`,
      ].join(' ')}
    >
      <style>{`body {margin: 0;}`}</style>
      <div>
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
              <h1 className={pageNumber !== 4 && pageNumber !== 5 ? 'text-pink-500 text-2xl font-medium' : 'text-blue-700 text-2xl font-medium'}>
                {pageNumber !== 4 && pageNumber !== 5 ? 'Required' : 'Optional'}
              </h1>
            </div>
            {pageNumber === 1 && <HonorOfConduct />}
            {pageNumber === 2 && <GameSelect />}
            {pageNumber === 3 && <InterestMatch />}
            {pageNumber === 4 && <TimeZone />}
            {pageNumber === 5 && <InvitationMessage />}
            <Link href={pageNumber === 1 ? '/party-finder' : ''}>
              {' '}
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
                (pageNumber === 3 && survey.interestMatch != null) ||
                pageNumber === 4 ||
                pageNumber === 5
                  ? 'primary'
                  : 'secondary'
              }
              className="w-[7.5rem] absolute bottom-16 right-16"
              onClick={() => {
                if (
                  pageNumber != 6 &&
                  ((pageNumber === 1 && survey.honorConduct) ||
                    (pageNumber === 2 && survey.games?.length !== 0) ||
                    (pageNumber === 3 && survey.interestMatch != null) ||
                    pageNumber === 4 ||
                    pageNumber === 5)
                )
                  setPageNumber(pageNumber + 1);
              }}
            >
              Next
            </Button>
          </div>
        ) : (
          <ProfilePreview />
        )}
      </div>
    </div>
  );
}
