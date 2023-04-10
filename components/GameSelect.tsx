import styles from '../styles/GameSelect.module.css';

export default function GameSelect() {
  const games = ['League of Legends', 'Valorant', 'Overwatch', 'Genshin Impact', 'Dota 2'];

  const createCheckbox = label => {
    return (
      <label className={styles.Game}>
        <input type="checkbox" />
        {label}
        <br />
      </label>
    );
  };

  return (
    <div className={styles.GameSelectContainer}>
      <h1 className={styles.Header}>Lets find a gaming buddy for you</h1>
      <h3 className={styles.SubHeader}>
        We want to ask you a few questions to find people based on your preferences.
      </h3>
      <h2 className={styles.Question}>1. What games do you play?</h2>
      <div className={styles.Games}> {games.map(label => createCheckbox(label))}
      <label className={styles.Game}>
        <input type="checkbox" />
        <input type="text" placeholder='Search other games' />
      </label></div>
    </div>
  );
}
