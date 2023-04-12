import GameSelect from '@/components/GameSelect';
import InterestMatch from '@/components/InterestMatch';
import InvitationMessage from '@/components/InvitationMessage';
import TimeZone from '@/components/TimeZone';
import { ProfilePreview } from '@/components/ProfilePreview';
import SideNav from '@/components/SideNav';
import styles from '../styles/BuddyFinder.module.css';
import { Icon } from '@iconify/react';
import { useState } from 'react';

export default function BuddyFinder() {

  const [pageNumber, setPageNumber] = useState(1)

  return (
    <div className={styles.BuddyFinderContainer}>
      <style>{`body {margin: 0;}`}</style>
      <SideNav />
      <div>
        <a className={styles.PartyFinder} href='./PartyFinder'>
          <span className={styles.BackArrow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41"
              height="41"
              viewBox="0 0 41 41"
              fill="none"
            >
              <path
                d="M20.5 0C9.17868 0 0 9.17868 0 20.5C0 31.8213 9.17868 41 20.5 41C31.8213 41 41 31.8213 41 20.5C41 9.17868 31.8213 0 20.5 0ZM23.9801 28.8469C24.1327 28.9918 24.2547 29.1659 24.339 29.3588C24.4232 29.5516 24.468 29.7594 24.4707 29.9699C24.4734 30.1804 24.434 30.3892 24.3547 30.5842C24.2754 30.7792 24.1578 30.9563 24.009 31.1051C23.8602 31.254 23.683 31.3715 23.4881 31.4508C23.2931 31.5301 23.0842 31.5696 22.8737 31.5669C22.6633 31.5642 22.4555 31.5194 22.2626 31.4351C22.0697 31.3508 21.8957 31.2288 21.7507 31.0762L12.2892 21.6147C11.9937 21.319 11.8277 20.918 11.8277 20.5C11.8277 20.082 11.9937 19.681 12.2892 19.3853L21.7507 9.92377C22.0488 9.64053 22.4458 9.48495 22.857 9.49022C23.2682 9.49548 23.6611 9.66117 23.9519 9.95196C24.2427 10.2427 24.4084 10.6356 24.4136 11.0468C24.4189 11.458 24.2633 11.855 23.9801 12.1531L15.6342 20.5L23.9801 28.8469Z"
                fill="#B1B1B1"
              />
            </svg>
          </span>
          <span className={styles.SwordCross}>
            <Icon icon="mdi:sword-cross" color="#939393" width="33" height="33" />
          </span>
          <span>Party Finder</span>
        </a>
        {pageNumber === 1 && <GameSelect />}
        {pageNumber === 2 && <InterestMatch />}
        {pageNumber === 3 && <TimeZone />}
        {pageNumber === 4 && <InvitationMessage />}
        {pageNumber === 5 && <ProfilePreview />}
        {pageNumber < 5 && <a className={styles.Next} onClick={() => {setPageNumber(pageNumber + 1)}}>Next</a>}
        {pageNumber != 1 && pageNumber < 5 && <a className={styles.Back} onClick={() => {setPageNumber(pageNumber - 1)}}>Back</a>}
        {pageNumber === 1 && <a className={styles.Back} href='./PartyFinder'>Back</a>}
      </div>
    </div>
  );
}
