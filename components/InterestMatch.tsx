import styles from "../styles/InterestMatch.module.css";
import { useState } from "react";

enum FindBuddyStates {
  NOT_SELECTED = -1,
  NO_PREFERENCE = 0,
  PREFERENCE = 1
}

export default function InterestMatch() {
  const [findBuddy, setFindBuddy] = useState<FindBuddyStates>(FindBuddyStates.NOT_SELECTED);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFindBuddy(Number(e.currentTarget.value));
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
      <h2 className={styles.SubHeader} style={{ marginLeft: "1.5rem" }}>
        i.e, age, gender and sexual identity, ethnography, etc.
      </h2>
      <div className={styles.Options}>
        <label className={styles.Option}>
          <input type="radio" value={FindBuddyStates.PREFERENCE} checked={findBuddy === FindBuddyStates.PREFERENCE} onChange={handleChange} />
          Yes, I would like to find a gaming buddy based on similar interest
          <br />
        </label>
        <label className={styles.Option}>
          <input type="radio" value={FindBuddyStates.NO_PREFERENCE} checked={findBuddy === FindBuddyStates.NO_PREFERENCE} onChange={handleChange} />
          No, it does not matter based on my profile
        </label>
      </div>
    </div>
  );
}
