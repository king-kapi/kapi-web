import ProgressBar from '@/components/ProgressBar';
import styles from '../styles/Onboarding.module.css';
import { useState } from 'react';
import Button from '@/components/Button';
import EmptyLayout from '@/components/layouts/EmptyLayout';
import OnboardingWelcome from '@/components/OnboardingWelcome';
import CustomizeAvatar from '@/components/CustomizeAvatar';

export default function Onboarding() {
    const [progress, setProgress] = useState(0)
    const [pageNumber, setPageNumber] = useState(1)

  return (
    <div className={styles.OnboardingContainer}>
      <div className={styles.Content}>{pageNumber === 1 && <OnboardingWelcome/>}
      {pageNumber === 2 && <CustomizeAvatar />}
      <Button className={styles.Back} type='secondary' onClick={() => {if(pageNumber > 1) {setProgress(progress - 20); setPageNumber(pageNumber - 1)}}}>Back</Button>
      <Button className={styles.Next} onClick={() => {setProgress(progress + 20); setPageNumber(pageNumber + 1)}}>Next</Button></div>
    </div>
  );
}

Onboarding.getLayout = EmptyLayout.getLayout
