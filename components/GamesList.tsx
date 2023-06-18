import styles from '../styles/GamesList.module.css'
import React, { useContext, useState, useEffect } from 'react';
import Game, { GameList } from '@/src/types/Games';
import Icon from "@/components/icons/Icon";

export default function GamesList (props:any) {
    const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  const games = GameList;

  const { content, setContent } = useContext<any>(props.formContext);

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
          <Icon className={selectedGames.includes(game) ? '' : 'hidden'} icon={"add"} />
        </div>
      </label>
    );
  };
    return(
        <div className={styles.Games}>{games.map((game, index) => createCheckbox(game, index))}</div>
    )
}