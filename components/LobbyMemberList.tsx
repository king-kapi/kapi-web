import styles from "../styles/LobbyMemberList.module.css";
import { useState } from "react";
import Tag from "./Tag";
import Button from "./Button";
import Icon from "@/components/icons/Icon";

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
          buttonType='secondary' className={[styles.LeaveButton, 'hover:bg-blue-400 active:!bg-primary-90'].join(
            ' '
          )}
        >
          <Icon  icon={"exit"}/>
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
         <Icon icon={"list_view"}/>
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
              key={member.name}
              className={styles.Member}
            >
              <div className={styles.MemberOptions}>
                <Icon icon={"toggle_vertical"} />
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
