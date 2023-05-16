import React, { useContext, useState, useEffect } from 'react';
import styles from '../styles/GameSelect.module.css';
import Game, { GameList } from '@/src/types/Games';
import Button from './Button';
import Icon, { Icons } from './Icon';
import { formContext } from '@/pages/partyfinder/buddyfinder';

export default function GameSelect() {
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  const games = GameList;

  const { content, setContent } = useContext(formContext);

  useEffect(() => {
    setContent({ ...content, games: selectedGames });
  }, [selectedGames]);

  const selectedBorder = 'border-solid border-2 border-transparent bg-gradient Selected';
  const unselectedBorder = 'border-solid border-2 border-textColor bg-mediumGrey';

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
          selectedGames.includes(game) ? selectedBorder : unselectedBorder,
        ].join(' ')}
        id={`Game${index}`}
        key={index}
        onClick={e => {
          handleSelectGame(e, game);
        }}
      >
        <div className={styles.GameImg}></div>
        <input type="checkbox" />
        <div className={styles.GameContent}>
          {game}
          <Icon className={selectedGames.includes(game) ? '' : 'hidden'} icon={Icons['ADD']} />
        </div>
      </label>
    );
  };

  return (
    <div className={styles.GameSelectContainer}>
      <style>{`.Selected {
          border: 2px solid transparent;
          background: linear-gradient(var(--mediumGrey), var(--mediumGrey)) padding-box, linear-gradient(to bottom, #F666AB, #93C4FF) border-box;
          box-shadow: 0px 0px 16px 4px rgba(255, 255, 255, 0.3);
      }`}</style>
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
