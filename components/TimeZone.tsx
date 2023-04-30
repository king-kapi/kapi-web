import styles from '../styles/TimeZone.module.css';

export default function TimeZone() {
    const timeZones = ['PST - Pacific Coast', 'CST - Central', 'EST - East Coast', 'MST - Mountain']

  const createCheckbox = (label:any) => {
    return (
      <label className={styles.TimeZone}>
        <input type="checkbox" />
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
      <h2 className={styles.Question}>3. What time region do you usually play in? (Optional)</h2>
      <div className={styles.TimeZones}>
        {timeZones.map(label => createCheckbox(label))}
        <label className={styles.TimeZone}>
          <input type="checkbox" />
          <input type="text" placeholder="Search Time Zone" />
        </label>
      </div>
    </div>
  );
}
