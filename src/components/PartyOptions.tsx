import styles from '@/src/styles/PartyOptions.module.css';
import Link from 'next/link';
import { useState } from 'react';
import Button from './Button';
import KapiBuddy from '@/assets/images/kapi_buddy.svg';
import KapiFriends from '@/assets/images/kapi_friends.svg';
import KapiCreate from '@/assets/images/king_kapi.svg';
import Image from 'next/image';
import { useAtom } from 'jotai';
import { partyFinderAtom } from '@/src/atoms/partyFinderAtom';

export default function PartyOptions() {
  const [survey, setSurvey] = useAtom(partyFinderAtom)
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectedOption(String(e.currentTarget.value));
    setSurvey({...survey, partyOption: e.currentTarget.value})
  };
  return (
    <div className={[styles.PartyOptionsContainer, 'text-textColor'].join(' ')}>
      <h1 className={styles.Header}>What are you looking for?</h1>
      <h2 className="font-medium text-2xl mb-[4.5rem]">Don't worry, we'll help you along the way.</h2>
      <div className={styles.ButtonsContainer}>
        <label
          className={[
            styles.PartyOption,
            selectedOption === '/party-finder/BuddyFinder' ? 'bg-primary-100' : 'bg-grey',
          ].join(' ')}
        >
          <input
            type="radio"
            value={'/party-finder/BuddyFinder'}
            checked={selectedOption === '/party-finder/BuddyFinder'}
            onChange={handleChange}
          />
          <Image src={KapiBuddy} alt="Kapi Buddy" height={80} className={styles.Icon} />
          <span>Find a Buddy</span>
        </label>
        <label
          className={[
            styles.PartyOption,
            selectedOption === '/party-finder/LobbyFinder' ? 'bg-primary-100' : 'bg-grey',
          ].join(' ')}
        >
          <input
            type="radio"
            value={'/party-finder/LobbyFinder'}
            checked={selectedOption === '/party-finder/LobbyFinder'}
            onChange={handleChange}
          />
          <Image src={KapiFriends} alt="Kapi Friends" height={80} className={styles.Icon} />
          <span>Join a Lobby</span>
        </label>
        <label
          className={[
            styles.PartyOption,
            selectedOption === '/party-finder/CreateLobby' ? 'bg-primary-100' : 'bg-grey',
          ].join(' ')}
        >
          <input
            type="radio"
            value={'/party-finder/CreateLobby'}
            checked={selectedOption === '/party-finder/CreateLobby'}
            onChange={handleChange}
          />
          <Image src={KapiCreate} alt="Kapi Create" height={80} className={styles.Icon} />
          <span>Create a Lobby</span>
        </label>
      </div>  
    </div>
  );
}
