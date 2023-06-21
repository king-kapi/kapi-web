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
            selectedOption === '/partyfinder/buddyfinder' ? 'bg-pressedGrey' : 'bg-grey',
          ].join(' ')}
        >
          <input
            type="radio"
            value={'/partyfinder/buddyfinder'}
            checked={selectedOption === '/partyfinder/buddyfinder'}
            onChange={handleChange}
          />
          <Icon icon={Icons['KAPI_BUDDY']} className={styles.FindBuddyIcon}/>
          <span>Find a Buddy</span>
        </label>
        <label
          className={[
            styles.PartyOption,
            selectedOption === '/partyfinder/lobbyfinder' ? 'bg-pressedGrey' : 'bg-grey',
          ].join(' ')}
        >
          <input
            type="radio"
            value={'/partyfinder/lobbyfinder'}
            checked={selectedOption === '/partyfinder/lobbyfinder'}
            onChange={handleChange}
          />
          <Icon icon={Icons['KAPI_FRIENDS']} className={styles.FindLobbyIcon}/>
          <span>Find a Lobby</span>
        </label>
        <label
          className={[
            styles.PartyOption,
            selectedOption === '/partyfinder/CreateLobby' ? 'bg-pressedGrey' : 'bg-grey',
          ].join(' ')}
        >
          <input
            type="radio"
            value={'/partyfinder/CreateLobby'}
            checked={selectedOption === '/partyfinder/CreateLobby'}
            onChange={handleChange}
          />
          <Icon icon={Icons['KING_KAPI']} className={styles.CreateLobbyIcon}/>
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
