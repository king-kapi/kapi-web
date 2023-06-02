import styles from '../styles/OnboardingGames.module.css';
import GamesList from './GamesList';
import { formContext } from '@/pages/onboarding';

export default function OnboardingGames() {
  return (
    <div className={styles.OnboardingGamesContainer}>
        <style>{`.Selected {
          border: 2px solid transparent;
          background: linear-gradient(var(--mediumGrey), var(--mediumGrey)) padding-box, linear-gradient(to bottom, #F666AB, #93C4FF) border-box;
          box-shadow: 0px 0px 16px 4px rgba(255, 255, 255, 0.3);
      }`}</style>
      <h1>Let’s learn more about you.</h1>
      <h2>
        This information help us optimize your experience here. However, you can choose to skip this
        step or hide this information from your profile.
      </h2>
      <GamesList formContext={formContext}/>
    </div>
  );
}
