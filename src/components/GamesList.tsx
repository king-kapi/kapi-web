import styles from "@/src/styles/GamesList.module.css";
import React, { useEffect, useState } from "react";
import Icon from "@/src/components/icons/Icon";
import { useAtomValue } from "jotai/index";
import { gamesStatusAtom } from "@/src/atoms/gamesAtom";
import _ID from "@/src/types/_ID";
import { IGame } from "@/src/models/Games";

export interface GamesListProps {
  onChange?: (selectedGames: _ID[]) => void;
  initialSelected?: _ID[];
}

export default function GamesList({
                                    onChange = () => {
                                      return;
                                    },
                                    initialSelected = []
                                  }: GamesListProps) {
  const [selectedGames, setSelectedGames] = useState<_ID[]>(initialSelected);
  const gamesStatus = useAtomValue(gamesStatusAtom);

  useEffect(() => {
    onChange(selectedGames);
  }, [selectedGames]);

  const selectedBorder = "border-solid border-2 border-transparent bg-gradient Selected";
  const unselectedBorder = "border-solid border-2 border-textColor bg-mediumGrey";

  const handleSelectGame = (e: React.MouseEvent<HTMLLabelElement>, game: IGame) => {
    e.preventDefault();

    if (selectedGames.includes(game._id))
      setSelectedGames(selectedGames.filter(a => a !== game._id));
    else setSelectedGames([...selectedGames, game._id]);
  };
  return (
    <div className={styles.Games}>{
      gamesStatus.data && gamesStatus.data.map((game, index) => {
        const selected = selectedGames.includes(game._id);

        return (
          <label
            className={[
              styles.Game,
              selected ? selectedBorder : unselectedBorder
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
              {game.name}
              <Icon className={selected ? "" : "hidden"} icon={"add"} />
            </div>
          </label>
        );
      })}</div>
  );
}