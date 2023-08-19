import styles from '@/src/styles/GamesInterests.module.css';
import { ReactNode } from 'react';

const GamesInterests = () => {
  const generateSurvey = () => {
    const games: string[][] = [
      ['LEAGUE OF LEGENDS', ''],
      ['GENSHIN IMPACT', ''],
      ['VALORANT', ''],
      ['DOTA 2', ''],
      ['OVERWATCH', ''],
    ];
    const listGames: ReactNode[] = games.map((game: string[]) => {
      return (
        <div className={styles.gameContainer}>
          <img src={game[1]} className={styles.cover} />
          <p className={styles.gameLabel}>{game[0]}</p>
        </div>
      );
    });
    return <div className={styles.listContainer}>{listGames}</div>;
  };

  return (
    // Add party finder component
    <div>
      <h1 className={styles.header}>Let's create a lobby for you.</h1>
      <h3 className={styles.subheader}>
        We want to ask you a few questions to find people based on your preferences.
      </h3>
      <h4 className={styles.prompt}>Select the games you want to play!</h4>
      {generateSurvey()}
    </div>
    // Add back
    // Add next
  );
};

export { GamesInterests };
