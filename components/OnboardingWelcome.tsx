import styles from '../styles/OnboardingWelcome.module.css';
import Icon, { Icons } from './Icon';

export default function OnboardingWelcome() {
  return (
    <div className={styles.OnboardingWelcomeContainer}>
      <div className={styles.AvatarContainer}>
        <Icon className={styles.Avatar} icon={Icons['KING_KAPI']} />
        <h3>King Kapi</h3>
        <h4>Lv. 100</h4>
      </div>
      <div className={[styles.MessageContainer, 'bg-mediumGrey'].join(' ')}>
        <h1>Welcome Junior Capybara.</h1>
        <h2>You will embark on a journey to meet other capybaras from different communities.</h2>
      </div>
    </div>
  );
}
