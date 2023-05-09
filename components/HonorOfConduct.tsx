import styles from '@/styles/HonorOfConduct.module.css';
import { Icon } from '@iconify/react';
import { useState } from 'react';

const HonorOfConduct = () => {
  const [agreed, setAgreed] = useState(false);
  const [clickedNext, setClickedNext] = useState(false);
  return (
    <div className={styles.honorOfConduct}>
      <h1 className={styles.header}>Honor of Conduct</h1>
      <p className={styles.body}>
        We want to ensure the safety of others when using this feature. We do not tolerate any form
        of discrimination, hate speech, and or other acts of malicious intent.
      </p>
      <p className={styles.body}>
        Please understand that certain features are restricted to adults (18+) to ensure the safety
        of minors.
      </p>
      <p className={styles.body}>
        To protect our community, we must ask you to sign a code of conduct promising us and the
        community that you will treat others with respect.
      </p>
      <label
        className={styles.checkbox}
    
        onChange={() => {
          setAgreed(!agreed);
        }}
      >
        <span
          className={[styles.Box, 'border-solid border border-textColor bg-black'].join(' ')}
        ></span>
        <input type="checkbox" />I acknowledge and agree to abide by honor of conduct.
      </label>
      <div className={!agreed && clickedNext ? styles.showWarning : styles.hideWarning}>
        Please acknowledge the honor of conduct to use these features!
      </div>
      <div onClick={() => setClickedNext(true)}>
        <button className={[styles.next, !agreed ? 'bg-mediumGrey z-10' : 'display-none z-0'].join(' ')}>Next</button>
      </div>
    </div>
  );
};

export { HonorOfConduct };
