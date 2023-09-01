import styles from '@/src/styles/InterestMatch.module.css';
import { useState, useEffect } from 'react';
import { partyFinderAtom } from '../atoms/partyFinderAtom';
import { useAtom } from 'jotai';

enum FindBuddyStates {
  NOT_SELECTED = -1,
  NO_PREFERENCE = 0,
  PREFERENCE = 1,
}

export default function InterestMatch() {
  const [survey, setSurvey] = useAtom(partyFinderAtom)
  const [findBuddy, setFindBuddy] = useState(survey.interestMatch);


  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFindBuddy(Number(e.currentTarget.value));
    setSurvey({...survey, interestMatch: Number(e.currentTarget.value)})
  };

  useEffect(() => {
    // setContent({ ...content, interestMatch: Boolean(findBuddy) });
  }, [findBuddy]);

  return (
    <div className={styles.InterestMatchContainer}>
      <h1 className={styles.Header}>Lets find a gaming buddy for you</h1>
      <h3 className={styles.SubHeader}>
        We want to ask you a few questions to find people based on your preferences.
      </h3>
      <h2 className={styles.Question}>
        Do you want to be matched with someone based on your profile?
      </h2>
      <h2 className={styles.Question} style={{fontWeight: 400}}>i.e, age, gender and sexual identity, ethnography, etc.</h2>
      <div className={styles.Options}>
        <label className={styles.Option}>
          <input
            type="radio"
            value={FindBuddyStates.PREFERENCE}
            checked={findBuddy === FindBuddyStates.PREFERENCE}
            onChange={handleChange}
          />
          Yes, I would like to find a gaming buddy based on similar interest
          <br />
        </label>
        <label className={styles.Option}>
          <input
            type="radio"
            value={FindBuddyStates.NO_PREFERENCE}
            checked={findBuddy === FindBuddyStates.NO_PREFERENCE}
            onChange={handleChange}
          />
          No, it does not matter based on my profile
        </label>
      </div>
    </div>
  );
}
