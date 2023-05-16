import { useState } from 'react';
import styles from '../styles/CustomizeAvatar.module.css';
import Icon, { Icons } from './Icon';

export default function CustomizeAvatar() {
  const [avatarColor, setAvatarColor] = useState('yellow-500');
  return (
    <div className={styles.CustomizeAvatarContainer}>
      <div className={styles.AvatarContainer}>
        <Icon className={styles.Avatar} icon={Icons['KING_KAPI']} />
        <h3>King Kapi</h3>
        <h4>Lv. 100</h4>
      </div>
      <div className={styles.MessageContainer}>
        <h1 className="text-4xl font-semibold">Let’s create an avatar and username for you.</h1>
        <h2 className="text-2xl font-medium">
          This is how others will identify you in this platform.
        </h2>
        <h2 className="text-2xl font-medium">1. Customize the color of your Capybara.</h2>
      </div>
      <div className={styles.CustomizeContainer}>
        <div className={styles.CustomAvatarContainer}>
          <div className={[styles.Circle, `bg-${avatarColor}`].join(' ')}>
            <Icon className={styles.CustomAvatar} icon={Icons['KAPI']} />
          </div>
        </div>
        <div className={styles.ChooseColorContainer}>
          <h3 className={styles.ColorsHeader}>Click on the color!</h3>
          <div className={styles.Colors}>
            <div
              className={[styles.Color, 'bg-pink-500'].join(' ')}
              onClick={() => setAvatarColor('pink-500')}
            ></div>
            <div
              className={[styles.Color, 'bg-blue-500'].join(' ')}
              onClick={() => setAvatarColor('blue-500')}
            ></div>
            <div
              className={[styles.Color, 'bg-cyan-500'].join(' ')}
              onClick={() => setAvatarColor('cyan-500')}
            ></div>
            <div
              className={[styles.Color, 'bg-yellow-500'].join(' ')}
              onClick={() => setAvatarColor('yellow-500')}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
