import React, { useState } from 'react';
import styles from '../styles/GameSelect.module.css';
import Game, { GameList } from '@/src/types/Games';
import Button from './Button';

export default function GameSelect() {
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  const games = GameList;

  const selectedBorder = 'border-solid border-2 border-blue-100';
  const unselectedBorder = 'border-solid border-2 border-textColor';

  const handleSelectGame = (e: React.MouseEvent<HTMLLabelElement>, game: Game) => {
    e.preventDefault();

    if (selectedGames.includes(game)) setSelectedGames(selectedGames.filter(a => a !== game));
    else setSelectedGames([...selectedGames, game]);
  };

  const createCheckbox = (game: Game, index: number) => {
    return (
      <label
        className={[
          styles.Game,
          'bg-mediumGrey',
          selectedGames.includes(game) ? selectedBorder : unselectedBorder,
        ].join(' ')}
        id={`Game${index}`}
        key={index}
        onClick={e => handleSelectGame(e, game)}
      >
        <div className={styles.GameImg}></div>
        <input type="checkbox" />
        {game}
        <br />
      </label>
    );
  };

  return (
    <div className={styles.GameSelectContainer}>
      <h1 className={styles.Header}>Select the games you want to play!</h1>
      <div className={styles.Games}>{games.map((game, index) => createCheckbox(game, index))}</div>
      <Button
        type={selectedGames.length === 0 ? 'secondary' : 'primary'}
        className={[styles.Next, selectedGames.length === 0 ? 'z-10 ' : 'hidden z-0'].join(' ')}
      >
        Next
      </Button>
    </div>
  );
}
