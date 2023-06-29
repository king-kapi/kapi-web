import styles from '../styles/ProfilePreview.module.css';
import ProfileCard from './ProfileCard';
import { useContext, useState } from 'react';
import Button from './Button';
import Icon from "@/components/icons/Icon";
import { formContext } from '@/pages/partyfinder/buddyfinder';

function ProfilePreview() {

  const {content} = useContext<any>(formContext)
  console.log(content)

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
