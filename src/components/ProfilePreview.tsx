import styles from "@/src/styles/ProfilePreview.module.css";
import ProfileCard from "./ProfileCard";
import React, { useState } from "react";
import Button from "./Button";
import Icon from "@/src/components/icons/Icon";

function ProfilePreview() {

  const [mode, setMode] = useState('dark')
  return (
    <div className={[styles.ProfilePreviewContainer, `theme-${mode} bg-black text-textColor`].join(' ')}>
      <div className={styles.TitleContainer}>
        <h1>Here are some buddies you can meet </h1>
        <Button className={styles.Reroll}>
          <Icon icon={'reroll'} />
          Reroll
        </Button>
      </div>
      <div className={styles.ServersContainer}>
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
      </div>
    </div>
  );
}

export { ProfilePreview };
