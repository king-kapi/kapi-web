import ProgressBar from '@/components/ProgressBar';
import styles from '../styles/Onboarding.module.css';
import { useState } from 'react';
import Button from '@/components/Button';
import EmptyLayout from '@/components/layouts/EmptyLayout';
import OnboardingWelcome from '@/components/OnboardingWelcome';

export default function Onboarding() {
    const [progress, setProgress] = useState(0)
    const [pageNumber, setPageNumber] = useState(1)

  return (
    <div className={styles.OnboardingContainer}>
      <div className={styles.ProgressBarContainer}>
        <ProgressBar progress={progress}></ProgressBar>
      </div>
      {pageNumber === 1 && <OnboardingWelcome/>}
      <Button className={styles.Back} type='secondary' onClick={() => {setProgress(progress - 20); setPageNumber(pageNumber - 1)}}>Back</Button>
      <Button className={styles.Next} onClick={() => {setProgress(progress + 20); setPageNumber(pageNumber + 1)}}>Next</Button>
    </div>
  );
}

Onboarding.getLayout = EmptyLayout.getLayout
