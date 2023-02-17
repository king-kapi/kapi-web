import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination, Grid} from 'swiper';
import styles from '../styles/AchievementsWidget.module.css';
import 'swiper/css/pagination';
import 'swiper/css/grid';

const achievements = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

function AchievementsWidget() {
  return (
    <div className={styles.achievementsWidgetContainer}>
      <div className={styles.titleContainer}>
        <h1>ACHIEVEMENTS</h1>
        <h2>looks like you're super cool</h2>
      </div>
      <Swiper
        modules={[Pagination, Grid]}
        spaceBetween={30}
        slidesPerView={3}
        grid={{ rows: 2 }}
        className={styles.mySwiper}
        pagination={{ clickable: true}}
      >
        {achievements.map((x, index) => {
          return (
            <SwiperSlide key={index} className={styles.achievementSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="69"
                height="69"
                viewBox="0 0 69 69"
                fill="none"
              >
                <circle cx="34.5" cy="34.5" r="34" fill="#EAEAEA" stroke="#434343" />
                <path
                  d="M11.1289 11.127L57.8708 58.9818M57.8708 11.127L11.1289 58.9818"
                  stroke="#434343"
                />
              </svg>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export { AchievementsWidget };
