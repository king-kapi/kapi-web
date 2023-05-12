import styles from '../styles/LobbyMemberList.module.css';
import { useState } from 'react';
import Tag from './Tag';
import Button from './Button';

export default function LobbyMemberList() {
  const tags = [
    { name: 'League of Legends', border: false },
    { name: 'NA Region', border: false },
    { name: 'PST', border: false },
    { name: 'LGBTQ+', border: true },
    { name: 'Casual Gaming', border: false },
  ];
  const members = [
    { name: 'Jane Doe', username: 'LoLPlayer123', role: 'ADC', experience: 'Silver' },
    { name: 'Jane Doe', username: 'LoLPlayer123', role: 'ADC', experience: 'Silver' },
    { name: 'Jane Doe', username: 'LoLPlayer123', role: 'ADC', experience: 'Silver' },
  ];

  const [view, setView] = useState('1');

  const handleChange = (e: any) => {
    setView(e.target.value);
  };

  return (
    <div className={[styles.LobbyMemberListContainer, 'text-textColor theme-blue'].join(' ')}>
      <div className={styles.HeaderContainer}>
        <h1 className={styles.Header}>
          Jane's Lobby <span>/ League of Legends</span>
        </h1>
        <Button
          type='secondary' className={[styles.LeaveButton, 'hover:bg-blue-400 active:!bg-primary-90'].join(
            ' '
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
          >
            <path
              d="M2.55556 23C1.85278 23 1.25095 22.7496 0.750057 22.2487C0.249169 21.7478 -0.000849682 21.1464 2.1694e-06 20.4444V15.3333H2.55556V20.4444H20.4444V2.55556H2.55556V7.66667H2.1694e-06V2.55556C2.1694e-06 1.85278 0.250447 1.25095 0.751335 0.750057C1.25222 0.249169 1.85363 -0.000849682 2.55556 2.1694e-06H20.4444C21.1472 2.1694e-06 21.7491 0.250447 22.2499 0.751335C22.7508 1.25222 23.0009 1.85363 23 2.55556V20.4444C23 21.1472 22.7496 21.7491 22.2487 22.2499C21.7478 22.7508 21.1464 23.0009 20.4444 23H2.55556ZM9.58333 17.8889L7.79445 16.0361L11.0528 12.7778H2.1694e-06V10.2222H11.0528L7.79445 6.96389L9.58333 5.11111L15.9722 11.5L9.58333 17.8889Z"
              fill="#E2E4E9"
            />
          </svg>
          Leave Lobby
        </Button>
      </div>
      <p className={styles.Description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <div className={styles.Tags}>
        {tags.map(tag => {
          return (
            <Tag key={tag.name} border={tag.border} size='small'>
              {tag.name}
            </Tag>
          );
        })}
      </div>
      <div className={styles.MemberCountContainer}>
        <h2 className={styles.MemberCount}>Party Members {members.length}/5</h2>
        <div className={styles.ViewOptions}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={styles.ViewIcon}
          >
            <mask id="path-1-inside-1_1693_6185" fill="white">
              <rect x="3" y="5" width="7" height="6" rx="1" />
            </mask>
            <rect
              x="3"
              y="5"
              width="7"
              height="6"
              rx="1"
              stroke="#8D8B8B"
              stroke-width="3"
              mask="url(#path-1-inside-1_1693_6185)"
            />
            <mask id="path-2-inside-2_1693_6185" fill="white">
              <rect x="3" y="14" width="7" height="6" rx="1" />
            </mask>
            <rect
              x="3"
              y="14"
              width="7"
              height="6"
              rx="1"
              stroke="#8D8B8B"
              stroke-width="3"
              mask="url(#path-2-inside-2_1693_6185)"
            />
            <line
              x1="12.75"
              y1="7.25"
              x2="21.25"
              y2="7.25"
              stroke="#8D8B8B"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <line
              x1="12.75"
              y1="16.25"
              x2="21.25"
              y2="16.25"
              stroke="#8D8B8B"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <select
            name="view"
            className={[styles.View, 'bg-black'].join(' ')}
            id="view"
            onChange={e => handleChange(e)}
          >
            <option value="1">View</option>
          </select>
        </div>
      </div>
      <div className={styles.Members}>
        {members.map(member => {
          return (
            <div
              className={styles.Member}
            >
              <div className={styles.MemberOptions}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="20"
                  viewBox="0 0 6 20"
                  fill="none"
                >
                  <ellipse
                    cx="3.29047"
                    cy="17.2573"
                    rx="2.33209"
                    ry="2.70893"
                    transform="rotate(-90 3.29047 17.2573)"
                    fill="#141E38"
                  />
                  <ellipse
                    cx="3.29047"
                    cy="9.79486"
                    rx="2.33209"
                    ry="2.70893"
                    transform="rotate(-90 3.29047 9.79486)"
                    fill="#141E38"
                  />
                  <ellipse
                    cx="3.29047"
                    cy="2.33197"
                    rx="2.33209"
                    ry="2.70893"
                    transform="rotate(-90 3.29047 2.33197)"
                    fill="#141E38"
                  />
                </svg>
              </div>
              <div className={styles.MemberAvatar}></div>
              <div className={styles.MemberInfo}>
                <h1 className={styles.MemberName}>{member.name}</h1>
                <h3 className={styles.MemberUsername}>@{member.username}</h3>
                <h2 className={styles.MemberRole}>Role: {member.role}</h2>
                <h2 className={styles.MemberExperience}>Experience: {member.experience}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
