import styles from "../styles/GamesList.module.css";
import React, { useEffect, useState } from "react";
import Game, { GameList } from "@/src/types/Games";
import Icon from "@/components/icons/Icon";

export interface GamesListProps {
  onChange?: (selectedGames: string[]) => void;
  initialSelected?: Game[];
}

export default function GamesList({
                                    onChange = () => {
                                      return;
                                    },
                                    initialSelected = []
                                  }: GamesListProps) {
  const [selectedGames, setSelectedGames] = useState<Game[]>(initialSelected);
  const games = GameList;

  useEffect(() => {
    onChange(selectedGames);
  }, [onChange, selectedGames]);

  const selectedBorder = "border-solid border-2 border-transparent bg-gradient Selected";
  const unselectedBorder = "border-solid border-2 border-textColor bg-mediumGrey";

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
          selectedGames.includes(game) ? selectedBorder : unselectedBorder
        ].join(" ")}
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
          <Icon className={selectedGames.includes(game) ? "" : "hidden"} icon={"add"} />
        </div>
      </label>
    );
  };
  return (
    <div className={styles.Games}>{games.map((game, index) => createCheckbox(game, index))}</div>
  );
}