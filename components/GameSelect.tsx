import { useState } from 'react';
import styles from '../styles/GameSelect.module.css';

export default function GameSelect() {
  const games = ['League of Legends', 'Genshin Impact', 'Valorant', 'Dota 2', 'Overwatch'];

  const selectedBorder = 'border-solid border-2 border-blue-100';
  const unselectedBorder = 'border-solid border-2 border-textColor';

  const  handleChange = (e: any) => {
    e.preventDefault();
    if (e.currentTarget.className.includes(unselectedBorder)) {
      e.currentTarget.className = e.currentTarget.className.replace(
        ' ' + unselectedBorder,
        ' ' + selectedBorder
      );
      setSelectedGames(selectedGames + 1)
    } else {
      e.currentTarget.className = e.currentTarget.className.replace(
        ' ' + selectedBorder,
        ' ' + unselectedBorder
      );
     setSelectedGames(selectedGames - 1)
    }
    console.log(selectedGames);
  };

  const [selectedGames, setSelectedGames] = useState(0)


  const createCheckbox = (label: string, index: number) => {
    return (
      <label
        className={[styles.Game, 'bg-mediumGrey', unselectedBorder].join(' ')}
        id={`Game${index}`}
        onClick={e => handleChange(e)}
      >
        <div className={styles.GameImg}></div>
        <input type="checkbox" />
        {label}
        <br />
      </label>
    );
  };

  return (
    <div className={styles.GameSelectContainer}>
      <h1 className={styles.Header}>Select the games you want to play!</h1>
      <div className={styles.Games}>
        {games.map((label, index) => createCheckbox(label, index))}
      </div>
      <button className={[styles.Next, (selectedGames === 0) ? 'bg-mediumGrey z-10' : 'display-none z-0'].join(' ')}>Next</button>
    </div>
  );
}
