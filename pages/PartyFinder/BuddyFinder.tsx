import GameSelect from '@/components/GameSelect';
import InterestMatch from '@/components/InterestMatch';
import InvitationMessage from '@/components/InvitationMessage';
import TimeZone from '@/components/TimeZone';
import { ProfilePreview } from '@/components/ProfilePreview';
import { HonorOfConduct } from '@/components/HonorOfConduct';
import styles from '../../styles/BuddyFinder.module.css';
import { Icon } from '@iconify/react';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';

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
        `theme-${mode} theme-blue bg-black text-textColor`,
      ].join(' ')}
    >
      <style>{`body {margin: 0;}`}</style>
      <div>
        <Link className={styles.PartyFinder} href="/partyfinder">
          <span className={styles.BackArrow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 41 41"
              fill="none"
            >
              <path
                className={styles.BackIcon}
                d="M20.5 0C9.17868 0 0 9.17868 0 20.5C0 31.8213 9.17868 41 20.5 41C31.8213 41 41 31.8213 41 20.5C41 9.17868 31.8213 0 20.5 0ZM23.9801 28.8469C24.1327 28.9918 24.2547 29.1659 24.339 29.3588C24.4232 29.5516 24.468 29.7594 24.4707 29.9699C24.4734 30.1804 24.434 30.3892 24.3547 30.5842C24.2754 30.7792 24.1578 30.9563 24.009 31.1051C23.8602 31.254 23.683 31.3715 23.4881 31.4508C23.2931 31.5301 23.0842 31.5696 22.8737 31.5669C22.6633 31.5642 22.4555 31.5194 22.2626 31.4351C22.0697 31.3508 21.8957 31.2288 21.7507 31.0762L12.2892 21.6147C11.9937 21.319 11.8277 20.918 11.8277 20.5C11.8277 20.082 11.9937 19.681 12.2892 19.3853L21.7507 9.92377C22.0488 9.64053 22.4458 9.48495 22.857 9.49022C23.2682 9.49548 23.6611 9.66117 23.9519 9.95196C24.2427 10.2427 24.4084 10.6356 24.4136 11.0468C24.4189 11.458 24.2633 11.855 23.9801 12.1531L15.6342 20.5L23.9801 28.8469Z"
                fill={'var(--grey)'}
              />
            </svg>
          </span>
          <span className={styles.SwordCross}>
            <Icon icon="mdi:sword-cross" color="var(--white)" width="33" height="33" />
          </span>
          <span>Party Finder</span>
        </Link>
        {pageNumber < 6 && (
          <Button
            className={styles.Next}
            onClick={() => {
              setPageNumber(pageNumber + 1);
            }}
          >
            Next
          </Button>
        )}
        <formContext.Provider value={providerValue}>
          {pageNumber === 1 && <HonorOfConduct />}
          {pageNumber === 2 && <GameSelect formContext={formContext}/>}
          {pageNumber === 3 && <InterestMatch />}
          {pageNumber === 4 && <TimeZone />}
          {pageNumber === 5 && <InvitationMessage />}
          {pageNumber === 6 && <ProfilePreview />}
        </formContext.Provider>
        {pageNumber !== 1 && pageNumber < 6 && (
          <Button
            type="secondary"
            className={styles.Back}
            style={{ left: '38.5rem' }}
            onClick={() => {
              setPageNumber(pageNumber - 1);
            }}
          >
            Back
          </Button>
        )}
        {pageNumber === 1 && (
          <Link href="/partyfinder">
            <Button type="secondary" className={styles.Back}>
              Back
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
