import { Icon } from '@iconify/react';
import styles from '@/styles/Sidenav.module.css';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

function SideNav() {
  const [activeTab, setActiveTab] = useState(1); // TOOD: useRouter to get path name to check current tab
  const [onlineStatus, setOnlineStatus] = useState(1);
  const { data, isLoading, isError, error } = useQuery('userInfo', () =>
    fetch(`http://localhost:3000/api/users/63f1762157a47ee3ab2337ae`).then(res => res.json())
  );
  if (isLoading) {
    return (
      <div className={styles.sidenav}>
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
        <section className={styles.whiteSection}>
          <span className={styles.header}>
            <div className={styles.avatarDiv}>
              <div>
                <div className={styles.avatar}></div>
              </div>
              <h1 className={styles.logoWord}>Logo</h1>
            </div>
            <div>
              <Icon icon="mdi:bell" className={styles.bell} />
            </div>
          </span>
          <div className={styles.menu}>
            <div onClick={() => setActiveTab(1)} className={styles.homeTab}>
              <div className={activeTab === 1 ? styles.selected : styles.notSelected}>
                <Icon
                  icon="mdi:house"
                  color={activeTab === 1 ? '#FFFFFF' : '#939393'}
                  className={styles.homeIcon}
                />
              </div>
              <span className={styles.homeTabWord}>Home</span>
            </div>
            <div onClick={() => setActiveTab(2)} className={styles.partyFinderTab}>
              <div className={activeTab === 2 ? styles.selected : styles.notSelected}>
                <Icon
                  icon="mdi:sword-cross"
                  color={activeTab === 2 ? '#FFFFFF' : '#939393'}
                  className={styles.partFinderIcon}
                />
              </div>
              <span className={styles.partyFinderTabWord}>Party Finder</span>
            </div>
            <div onClick={() => setActiveTab(3)} className={styles.communityTab}>
              <div className={activeTab === 3 ? styles.selected : styles.notSelected}>
                <Icon
                  icon="fa-solid:user-friends"
                  color={activeTab === 3 ? '#FFFFFF' : '#939393'}
                  className={styles.communityIcon}
                />
              </div>
              <span className={styles.communityTabWord}>Community</span>
            </div>
            <div onClick={() => setActiveTab(4)} className={styles.forYouTab}>
              <div className={activeTab === 4 ? styles.selected : styles.notSelected}>
                <Icon
                  icon="ph:sparkle-fill"
                  color={activeTab === 4 ? '#FFFFFF' : '#939393'}
                  className={styles.forYouIcon}
                />
              </div>
              <span className={styles.forYouTabWord}>For You</span>
            </div>
          </div>
        </section>
        <section className={styles.graySection}>
          <h1>
            Friends - <span>9/26</span>
          </h1>
        </section>
        <section className={styles.blackSection}>
          <div className={styles.statusContainer}>
            <div className={styles.userAvatar}>
              <div className={getCurrentStatus()}></div>
            </div>
            <div className={styles.userNameContainer}>
              <span className={styles.userName}>Username</span>
              <select
                name="status"
                className={styles.status}
                id="status"
                onChange={e => handleChange(e)}
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

  if (isError) {
    return <span>Error fetching data</span>;
  }

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

  function fetchFriends() {
    const friends = data.friends;
    const friendsList = friends.map((friend: { username: string }) => (
      <li>
        <div className={styles.friendsAvatar}>
          <div className={styles.statusOnline}></div>
        </div>
        <span>{friend.username}</span>
      </li>
    ));
    return (
      <div>
        <h1>
          Friends - <span>{friends.length}/26</span>
        </h1>
        <ul>{friendsList}</ul>
      </div>
    );
  }

  
  return (
    <div className={styles.sidenav}>
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
      <section className={styles.whiteSection}>
        <span className={styles.header}>
          <div className={styles.avatarDiv}>
            <div>
              <div className={styles.avatar}></div>
            </div>
            <h1 className={styles.logoWord}>Logo</h1>
          </div>
          <div>
            <Icon icon="mdi:bell" className={styles.bell} />
          </div>
        </span>
        <div className={styles.menu}>
          <div onClick={() => setActiveTab(1)} className={styles.homeTab}>
            <div className={activeTab === 1 ? styles.selected : styles.notSelected}>
              <Icon
                icon="mdi:house"
                color={activeTab === 1 ? '#FFFFFF' : '#939393'}
                className={styles.homeIcon}
              />
            </div>
            <span className={styles.homeTabWord}>Home</span>
          </div>
          <div onClick={() => setActiveTab(2)} className={styles.partyFinderTab}>
            <div className={activeTab === 2 ? styles.selected : styles.notSelected}>
              <Icon
                icon="mdi:sword-cross"
                color={activeTab === 2 ? '#FFFFFF' : '#939393'}
                className={styles.partFinderIcon}
              />
            </div>
            <span className={styles.partyFinderTabWord}>Party Finder</span>
          </div>
          <div onClick={() => setActiveTab(3)} className={styles.communityTab}>
            <div className={activeTab === 3 ? styles.selected : styles.notSelected}>
              <Icon
                icon="fa-solid:user-friends"
                color={activeTab === 3 ? '#FFFFFF' : '#939393'}
                className={styles.communityIcon}
              />
            </div>
            <span className={styles.communityTabWord}>Community</span>
          </div>
          <div onClick={() => setActiveTab(4)} className={styles.forYouTab}>
            <div className={activeTab === 4 ? styles.selected : styles.notSelected}>
              <Icon
                icon="ph:sparkle-fill"
                color={activeTab === 4 ? '#FFFFFF' : '#939393'}
                className={styles.forYouIcon}
              />
            </div>
            <span className={styles.forYouTabWord}>For You</span>
          </div>
        </div>
      </section>
      <section className={styles.graySection}>{fetchFriends()}</section>
      <section className={styles.blackSection}>
        <div className={styles.statusContainer}>
          <div className={styles.userAvatar}>
            <div className={getCurrentStatus()}></div>
          </div>
          <div className={styles.userNameContainer}>
            <span className={styles.userName}>{`${data.username}#${data.tag}`}</span>
            <select
              name="status"
              className={styles.status}
              id="status"
              onChange={e => handleChange(e)}
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
