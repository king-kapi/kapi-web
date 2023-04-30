

import styles from '../styles/GameWidget.module.css';

function GameWidget() {
  return (
    <div className={styles.GameWidgetContainer}>
      <div className={styles.TitleContainer}>
        <h1 className={styles.Title}>LOOKS LIKE YOUR FRIENDS ARE ON 👀</h1>
      </div>
      <div className={styles.ContentContainer}>
        <div className={styles.GameContainer}>
          <div className={styles.GameImg}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="123"
              height="89"
              viewBox="0 0 123 89"
              fill="none"
            >
              <path d="M121.318 1.04297V87.3739H1.79883V1.04297H121.318Z" fill="#F0F0F0" />
              <path
                d="M1.79883 1.04297L121.318 87.3739M1.79883 1.04297V87.3739M1.79883 1.04297H121.318M121.318 87.3739V1.04297M121.318 87.3739H1.79883M121.318 1.04297L1.79883 87.3739"
                stroke="#777777"
                stroke-width="2"
              />
            </svg>
          </div>
          <div className={styles.Username}>@this</div>
          <div className={styles.Game}>playing this game</div>
        </div>
        <div className={styles.GameContainer}>
          <div className={styles.GameImg}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="123"
              height="89"
              viewBox="0 0 123 89"
              fill="none"
            >
              <path d="M121.318 1.04297V87.3739H1.79883V1.04297H121.318Z" fill="#F0F0F0" />
              <path
                d="M1.79883 1.04297L121.318 87.3739M1.79883 1.04297V87.3739M1.79883 1.04297H121.318M121.318 87.3739V1.04297M121.318 87.3739H1.79883M121.318 1.04297L1.79883 87.3739"
                stroke="#777777"
                stroke-width="2"
              />
            </svg>
          </div>
          <div className={styles.Username}>@that</div>
          <div className={styles.Game}>playing that game</div>
        </div>
        <div className={styles.GameContainer}>
          <div className={styles.GameImg}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="123"
              height="89"
              viewBox="0 0 123 89"
              fill="none"
            >
              <path d="M121.318 1.04297V87.3739H1.79883V1.04297H121.318Z" fill="#F0F0F0" />
              <path
                d="M1.79883 1.04297L121.318 87.3739M1.79883 1.04297V87.3739M1.79883 1.04297H121.318M121.318 87.3739V1.04297M121.318 87.3739H1.79883M121.318 1.04297L1.79883 87.3739"
                stroke="#777777"
                stroke-width="2"
              />
            </svg>
          </div>
          <div className={styles.Username}>@this</div>
          <div className={styles.Game}>playing this game</div>
        </div>
        <div className={styles.GameContainer}>
          <div className={styles.GameImg}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="123"
              height="89"
              viewBox="0 0 123 89"
              fill="none"
            >
              <path d="M121.318 1.04297V87.3739H1.79883V1.04297H121.318Z" fill="#F0F0F0" />
              <path
                d="M1.79883 1.04297L121.318 87.3739M1.79883 1.04297V87.3739M1.79883 1.04297H121.318M121.318 87.3739V1.04297M121.318 87.3739H1.79883M121.318 1.04297L1.79883 87.3739"
                stroke="#777777"
                stroke-width="2"
              />
            </svg>
          </div>
          <div className={styles.Username}>@that</div>
          <div className={styles.Game}>playing that game</div>
        </div>
      </div>
    </div>
  );
}

export { GameWidget };