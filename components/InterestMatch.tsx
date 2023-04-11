import styles from '../styles/InterestMatch.module.css';
import { useState } from 'react';

export default function InterestMatch() {
    const [value, setValue] = useState('1');

    const handleChange = (e:any) => {
      setValue(e.target.value);
    };
  return (
    <div className={styles.InterestMatchContainer}>
      <h1 className={styles.Header}>Lets find a gaming buddy for you</h1>
      <h3 className={styles.SubHeader}>
        We want to ask you a few questions to find people based on your preferences.
      </h3>
      <h2 className={styles.Question}>
        2. Do you want to be matched with someone based on your profile?
      </h2>
      <h2 className={styles.SubHeader} style={{ marginLeft: '1.5rem' }}>
        i.e, age, gender and sexual identity, ethnography, etc.
      </h2>
      <div className={styles.Options}>
        <label className={styles.Option}>
          <input type="radio" value='1' checked={value === '1'} onChange={handleChange}/>
          Yes, I would like to find a gaming buddy based on similar interest
          <br />
        </label>
        <label className={styles.Option}>
          <input type="radio" value='0' checked={value === '0'} onChange={handleChange}/>
          No, it does not matter based on my profile
        </label>
      </div>
    </div>
  );
}
