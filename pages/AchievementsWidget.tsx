import exp from 'constants';
import Swiper from 'swiper';
import 'swiper/css';
import styles from '../styles/AchievementsWidget.module.css';

const achievements = [{}, {}, {}, {}, {}, {}, {}];

function AchievementsWidget() {
  return (
    <div className={styles.achievementsWidgetContainer}>
      <div className={styles.titleContainer}>
        <h1>ACHIEVEMENTS</h1>
        <h2>looks like you're super cool</h2>
      </div>
      <div className="swiper">
        <div className="swiper-wrapper">
          
        </div>
      </div>
    </div>
  );
}

export { AchievementsWidget };