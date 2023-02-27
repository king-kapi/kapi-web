import { Icon } from '@iconify/react';
import styles from '@/styles/Sidenav.module.css';
import React, { useState } from 'react';

function SideNav() {
  const [activeTab, setActiveTab] = useState(1);
  const [onlineStatus, setOnlineStatus] = useState(1);
  // useRouter to get path name to check current tab

  const handleChange = (e: any) => {
    setOnlineStatus(e.target.value);
  };

  function getCurrentStatus() {
    if (onlineStatus == 1) {
      return styles.statusOnline;
    } else if (onlineStatus == 2) {
      return styles.statusIdle;
    } else {
      return styles.statusOffline;
    }
  }

  return (
    <div className={styles.Sidenav}>
      <style>{`/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #1a1b1e;;
  border-radius: 10px
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #333333;
}`}</style>
      <section className={styles.Sidenav_whitesection}>
        <span className={styles.Sidenav_header}>
          <div className={styles.Sidenav_avatardiv}>
            <div>
              <div className={styles.Sidenav_avatar}></div>
            </div>
            <h1 className={styles.logoWord}>Logo</h1>
          </div>
          <div>
            <Icon icon="mdi:bell" className={styles.Sidenav_bell} />
          </div>
        </span>
        <div className={styles.Sidenav_menu}>
          <div onClick={() => setActiveTab(1)} className={styles.homeTab}>
            <div className={activeTab === 1 ? styles.selected : styles.notSelected}>
              <Icon
                icon="mdi:house"
                color={activeTab === 1 ? '#FFFFFF' : '#939393'}
                className={styles.home_icon}
              />
            </div>
            <span className={styles.homeTabWord}>Home</span>
          </div>
          <div onClick={() => setActiveTab(2)} className={styles.partyFinderTab}>
            <div className={activeTab === 2 ? styles.selected : styles.notSelected}>
              <Icon
                icon="mdi:sword-cross"
                color={activeTab === 2 ? '#FFFFFF' : '#939393'}
                className={styles.partyFinder_icon}
              />
            </div>
            <span className={styles.partyFinderTabWord}>Party Finder</span>
          </div>
          <div onClick={() => setActiveTab(3)} className={styles.communityTab}>
            <div className={activeTab === 3 ? styles.selected : styles.notSelected}>
              <Icon
                icon="fa-solid:user-friends"
                color={activeTab === 3 ? '#FFFFFF' : '#939393'}
                className={styles.community_icon}
              />
            </div>
            <span className={styles.communityTabWord}>Community</span>
          </div>
          <div onClick={() => setActiveTab(4)} className={styles.forYouTab}>
            <div className={activeTab === 4 ? styles.selected : styles.notSelected}>
              <Icon
                icon="ph:sparkle-fill"
                color={activeTab === 4 ? '#FFFFFF' : '#939393'}
                className={styles.forYou_icon}
              />
            </div>
            <span className={styles.forYouTabWord}>For You</span>
          </div>
        </div>
      </section>
      <section className={styles.Sidenav_graysection}>
        <h1>
          Friends - <span>9/26</span>
        </h1>
        <ul>
          <li>
            <div className={styles.friendsAvatar}><div className={getCurrentStatus()}></div></div>
            <span>Jane Doe</span>
          </li>
          <li>
            <div className={styles.friendsAvatar}><div className={getCurrentStatus()}></div></div>
            <span>Jane Doe</span>
          </li>
          <li>
            <div className={styles.friendsAvatar}><div className={getCurrentStatus()}></div></div>
            <span>Jane Doe</span>
          </li>
          <li>
            <div className={styles.friendsAvatar}><div className={getCurrentStatus()}></div></div>
            <span>Jane Doe</span>
          </li>
          <li>
            <div className={styles.friendsAvatar}><div className={getCurrentStatus()}></div></div>
            <span>Jane Doe</span>
          </li>
          <li>
            <div className={styles.friendsAvatar}><div className={getCurrentStatus()}></div></div>
            <span>Jane Doe</span>
          </li>
        </ul>
      </section>
      <section className={styles.Sidenav_blacksection}>
        <div className={styles.Sidenav_statuscontainer}>
          <div className={styles.userAvatar}>
            <div className={getCurrentStatus()}></div>
          </div>
          <div className={styles.userNameContainer}>
            <span className={styles.userName}>Username</span>
            <select
              name="status"
              className={styles.status}
              id="status"
              onChange={(e) => handleChange(e)}
            >
              <option value="1">Online</option>
              <option value="2">Idle</option>
              <option value="3">Offline</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SideNav;
