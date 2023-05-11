import styles from '../styles/PartyOptions.module.css';
import Icon, {Icons} from './Icon';
import Link from 'next/link';
import { useState } from 'react';
import Button from './Button';

export default function PartyOptions() {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectedOption(String(e.currentTarget.value));
  };
  return (
    <div className={[styles.PartyOptionsContainer, 'text-textColor'].join(' ')}>
      <h1 className={styles.Header}>What are you looking for?</h1>
      <div className={styles.ButtonsContainer}>
        <label
          className={[
            styles.PartyOption,
            selectedOption === '/PartyFinder/BuddyFinder' ? 'bg-pressedGrey' : 'bg-grey',
          ].join(' ')}
        >
          <input
            type="radio"
            value={'/PartyFinder/BuddyFinder'}
            checked={selectedOption === '/PartyFinder/BuddyFinder'}
            onChange={handleChange}
          />
          <Icon icon={Icons['FIND_BUDDY_BARA']} className={styles.FindBuddyIcon}/>
          <span>Find a Buddy</span>
        </label>
        <label
          className={[
            styles.PartyOption,
            selectedOption === '/PartyFinder/LobbyFinder' ? 'bg-pressedGrey' : 'bg-grey',
          ].join(' ')}
        >
          <input
            type="radio"
            value={'/PartyFinder/LobbyFinder'}
            checked={selectedOption === '/PartyFinder/LobbyFinder'}
            onChange={handleChange}
          />
          <Icon icon={Icons['FIND_LOBBY_BARA']} className={styles.FindLobbyIcon}/>
          <span>Find a Lobby</span>
        </label>
        <label
          className={[
            styles.PartyOption,
            selectedOption === '/PartyFinder/CreateLobby' ? 'bg-pressedGrey' : 'bg-grey',
          ].join(' ')}
        >
          <input
            type="radio"
            value={'/PartyFinder/CreateLobby'}
            checked={selectedOption === '/PartyFinder/CreateLobby'}
            onChange={handleChange}
          />
          <Icon icon={Icons['CREATE_LOBBY_BARA']} className={styles.CreateLobbyIcon}/>
          <span>Create a Lobby</span>
        </label>
      </div>
      <div className={styles.NextBackContainer}>
        <Link href="">
          <Button type="secondary" className={styles.Back}>
            Back
          </Button>
        </Link>
        <Link href={selectedOption}>
          <Button type={selectedOption.length === 0 ? 'secondary' : 'primary'} className={styles.Next}>Next</Button>
        </Link>
      </div>
    </div>
  );
}
