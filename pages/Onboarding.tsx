import ProgressBar from '@/components/ProgressBar';
import styles from '../styles/Onboarding.module.css';
import React, { useState, useMemo } from 'react';
import Button from '@/components/Button';
import EmptyLayout from '@/components/layouts/EmptyLayout';
import OnboardingWelcome from '@/components/OnboardingWelcome';
import OnboardingUsername from '@/components/OnboardingUsername';
import OnboardingGames from '@/components/OnboardingGames';

export type formContent = {
  games: string[];
  username: string;
};

export const formContext = React.createContext({});
export default function Onboarding() {
  const [progress, setProgress] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const [content, setContent] = useState<formContent>({
    games: [],
    username: '',
  });


  const providerValue = useMemo(() => ({ content, setContent }), [content, setContent]);

  return (
    <div className={styles.OnboardingContainer}>
      <formContext.Provider value={providerValue}>
        <div className={styles.Content} style={pageNumber === 4 ? {width: '64.063rem', height: '53rem'} : {}}>
          {pageNumber === 1 && <OnboardingWelcome />}
          {pageNumber === 2 && <OnboardingUsername />}
          {pageNumber === 3 /* && <CustomizeAvatar /> */}
          {pageNumber === 4 && <OnboardingGames />}
        </div>
      </formContext.Provider>
      <Button
        className={styles.Back}
        type="secondary"
        onClick={() => {
          if (pageNumber > 1) {
            setProgress(progress - 20);
            setPageNumber(pageNumber - 1);
          }
        }}
        style={pageNumber === 4 ? {left: '32rem', bottom: '12.5rem', width: '9.125rem'} : {}}
      >
        Back
      </Button>
      <Button
        className={styles.Next}
        onClick={() => {
          setProgress(progress + 20);
          setPageNumber(pageNumber + 1);
        }}
        style={pageNumber === 4 ? {right: '32rem', bottom: '12.5rem', width: '9.125rem'} : {}}
      >
        Next
      </Button>
    </div>
  );
}

Onboarding.getLayout = EmptyLayout.getLayout;
