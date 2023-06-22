import styles from '../styles/PartyOptions.module.css';
import Icon from './icons/Icon'
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import kapiBuddy from "@/assets/images/kapi_buddy.svg";
import kapiFriends from "@/assets/images/kapi_friends.svg";
import kingKapi from '@/assets/images/king_kapi.svg'

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
          <Image  src={kapiBuddy} alt={'Kapi Buddy'} className={styles.FindBuddyIcon}/>
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
          <Image  src={kapiFriends} alt={'Kapi Friends'} className={styles.FindLobbyIcon}/>
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
          <Image  src={kingKapi} alt={'King Kapi'} className={styles.CreateLobbyIcon}/>
          <span>Create a Lobby</span>
        </label>
      </div>
      <div className={styles.NextBackContainer}>
        <Link href="">
          <Button buttonType="secondary" className={styles.Back}>
            Back
          </Button>
        </Link>
        <Link href={selectedOption}>
          <Button buttonType={selectedOption.length === 0 ? 'secondary' : 'primary'} className={styles.Next}>Next</Button>
        </Link>
      </div>
    </div>
  );
}
