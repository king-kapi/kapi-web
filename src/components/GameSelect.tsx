import React from 'react';
import styles from '@/src/styles/GameSelect.module.css';
import GamesList from './GamesList';
import { atom, useAtom } from 'jotai';
import { partyFinderAtom } from '../atoms/partyFinderAtom';

export default function GameSelect(props: any) {
  const [survey, setSurvey] = useAtom(partyFinderAtom);

  return (
    <div className={styles.GameSelectContainer}>
      <style>{`.Selected {
          border: 2px solid transparent;
          background: linear-gradient(var(--mediumGrey), var(--mediumGrey)) padding-box, linear-gradient(to bottom, #F666AB, #93C4FF) border-box;
          box-shadow: 0px 0px 16px 4px rgba(255, 255, 255, 0.3);
      }`}</style>
      <h1 className={styles.Header}>Select the games you want to play!</h1>
      <GamesList
        initialSelected={[]}
        onChange={selectedGames => {
          setSurvey({
            ...survey,
            games: selectedGames,
          });
        }}
      />
    </div>
  );
}
