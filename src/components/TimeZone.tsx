import { useEffect, useState } from 'react';
import styles from '@/src/styles/TimeZone.module.css';
import { partyFinderAtom } from '../atoms/partyFinderAtom';
import { useAtom } from 'jotai';

export default function TimeZone() {
  const [survey, setSurvey] = useAtom(partyFinderAtom);
  const timeZones = ['Eastern (ET)', 'Central (ET)', 'Hawaii (HST)', 'Pacific Standard Time (PST)'];
  const [selectedZone, setSelectedZone] = useState(survey.timezone);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectedZone(Number(e.currentTarget.value));
    setSurvey({ ...survey, timezone: Number(e.currentTarget.value) });
  };

  useEffect(() => {
    // setContent({ ...content, timezone: selectedZone });
  }, [selectedZone]);

  const createCheckbox = (label: any, index: number) => {
    return (
      <label className={styles.Option}>
        <input
          type="radio"
          value={index}
          checked={selectedZone === index}
          onChange={handleChange}
        />
        {label}
        <br />
      </label>
    );
  };

  return (
    <div className={styles.TimeZoneContainer}>
      <h1 className={styles.Header}>Lets find a gaming buddy for you</h1>
      <h3 className={styles.SubHeader}>
        We want to ask you a few questions to find people based on your preferences.
      </h3>
      <h2 className={styles.Question}>What time region do you usually play in? (Optional)</h2>
      <div className={styles.Options}>
        {timeZones.map((label, index) => createCheckbox(label, index))}
      </div>
    </div>
  );
}
