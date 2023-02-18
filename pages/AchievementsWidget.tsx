import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination, Grid, Navigation } from 'swiper';
import styles from '../styles/AchievementsWidget.module.css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/grid';

const achievements = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

function AchievementsWidget() {
  return (
    <div className={styles.achievementsWidgetContainer}>
      <div className={styles.achievementsWidgetContentContainer}>
        <div className={styles.titleContainer}>
          <h1>ACHIEVEMENTS</h1>
          <h2>looks like you're super cool</h2>
        </div>
        <Swiper
          modules={[Pagination, Grid, Navigation]}
          navigation={{
            prevEl: '.prevArrow',
            nextEl: '.nextArrow',
          }}
          spaceBetween={30}
          slidesPerView={3}
          grid={{ rows: 2 }}
          className={styles.mySwiper}
          pagination={{ clickable: true }}
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
      <div className="prevArrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="none"
        >
          <path
            d="M8.24512 10.1299L2.99955 6.06484L8.24512 1.9998"
            stroke="black"
            stroke-width="3"
          />
        </svg>
      </div>
      <div className="nextArrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="12"
          viewBox="0 0 9 12"
          fill="none"
        >
          <path d="M1 2L6.24557 6.06504L1 10.1301" stroke="black" stroke-width="3" />
        </svg>
      </div>
      <style>{`
        .prevArrow {
          position: relative;
          bottom: 50%;
          left: 1.313rem;
          width: 0.313rem;
          transition: .5s;
        }

        .swiper-button-disabled {
          opacity: 0;
        }

        .nextArrow {
          position: relative;
          bottom: 55%;
          right: 1.313rem;
          width: 0.313rem;
          float: right;
          transition: .5s;
        }
      `}</style>
    </div>
  );
}

export { AchievementsWidget };
