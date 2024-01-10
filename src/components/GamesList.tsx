import styles from '@/src/styles/GamesList.module.css';
import React, {useState} from 'react';
import Icon from '@/src/components/icons/Icon';
import {useAtomValue} from 'jotai';
import {gamesStatusAtom} from '@/src/atoms/gamesAtom';
import {IGame} from '@/src/models/Games';

export interface GamesListProps {
  onChange?: (selectedGames: string[]) => void;
  initialSelected?: string[];
}

export default function GamesList({
  onChange = () => {
    return;
  },
  initialSelected = [],
}: GamesListProps) {
  const [selectedGames, setSelectedGames] = useState<string[]>(initialSelected);
  const gamesStatus = useAtomValue(gamesStatusAtom);

  const selectedBorder = 'border-solid border-2 border-transparent bg-gradient Selected';
  const unselectedBorder = 'border-solid border-2 border-textColor bg-mediumGrey';

  const handleSelectGame = (e: React.MouseEvent<HTMLLabelElement>, game: IGame) => {
    e.preventDefault();

    let newGames;
    if (selectedGames.includes(game._id.toString()))
      newGames = selectedGames.filter(a => a !== game._id.toString());
    else newGames = [...selectedGames, game._id.toString()];

    setSelectedGames(newGames);
    onChange(newGames);
  };

  return (
    <div className={styles.Games}>
      {gamesStatus.data &&
        gamesStatus.data.map((game, index) => {
          const selected = selectedGames.includes(game._id.toString());

          return (
            <label
              className={[styles.Game, selected ? selectedBorder : unselectedBorder].join(' ')}
              id={`Game${index}`}
              key={index}
              onClick={e => {
                handleSelectGame(e, game);
              }}
            >
              <div
                className={styles.GameImg}
                style={{
                  backgroundImage: `url(${game.image})`,
                }}
              ></div>
              <input type="checkbox" />
              <div className={styles.GameContent}>
                {game.name}
                <Icon className={selected ? '' : 'opacity-0'} icon={'add'} />
              </div>
            </label>
          );
        })}
    </div>
  );
}
