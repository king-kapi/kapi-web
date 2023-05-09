import { useState } from 'react';
import styles from '../styles/TimeZone.module.css';

export default function TimeZone() {
    const timeZones = ['Easter (ET)', 'Central (ET)', 'Hawaii (HST)', 'Pacific Standard Time (PST)']
    const [selectedZone, setSelectedZone] = useState(-1)

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      setSelectedZone(Number(e.currentTarget.value));
    };

  const createCheckbox = (label:any, index:number) => {
    return (
      <label className={styles.Option}>
        <input type="radio" value={index} checked={selectedZone === index} onChange={handleChange}/>
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
      <h2 className={styles.Question}>2. What time region do you usually play in? (Optional)</h2>
      <div className={styles.Options}>
        {timeZones.map((label, index) => createCheckbox(label, index))}
      </div>
      <button className={[styles.Next, (selectedZone === -1) ? 'bg-mediumGrey z-10' : 'display-none z-0'].join(' ')}>Next</button>

    </div>
  );
}
