import styles from '@/src/styles/InterestsWidget.module.css';

function InterestsWidget() {
  return (
    <div className={styles.InterestsWidgetContainer}>
      <div className={styles.TitleContainer}>
        <h1>BASED ON YOUR INTERESTS &gt;</h1>
        <h2>here are some recommended servers for you!</h2>
      </div>
      <div className={styles.ServersContainer}>
        <div className={styles.Server}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="196"
            height="120"
            viewBox="0 0 196 120"
            fill="none"
          >
            <path d="M194.282 1.21094V118.237H1.22168V1.21094H194.282Z" fill="#F0F0F0" />
            <path
              d="M1.22168 1.21094L194.282 118.237M1.22168 1.21094V118.237M1.22168 1.21094H194.282M194.282 118.237V1.21094M194.282 118.237H1.22168M194.282 1.21094L1.22168 118.237"
              stroke="#777777"
              stroke-width="2"
            />
          </svg>
          <h2 className={styles.ServerName}>Server name</h2>
          <p className={styles.Members}># members</p>
        </div>
        <div className={styles.Server}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="196"
            height="120"
            viewBox="0 0 196 120"
            fill="none"
          >
            <path d="M194.282 1.21094V118.237H1.22168V1.21094H194.282Z" fill="#F0F0F0" />
            <path
              d="M1.22168 1.21094L194.282 118.237M1.22168 1.21094V118.237M1.22168 1.21094H194.282M194.282 118.237V1.21094M194.282 118.237H1.22168M194.282 1.21094L1.22168 118.237"
              stroke="#777777"
              stroke-width="2"
            />
          </svg>
          <h2 className={styles.ServerName}>Server name</h2>
          <p className={styles.Members}># members</p>
        </div>
        <div className={styles.Server}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="196"
            height="120"
            viewBox="0 0 196 120"
            fill="none"
          >
            <path d="M194.282 1.21094V118.237H1.22168V1.21094H194.282Z" fill="#F0F0F0" />
            <path
              d="M1.22168 1.21094L194.282 118.237M1.22168 1.21094V118.237M1.22168 1.21094H194.282M194.282 118.237V1.21094M194.282 118.237H1.22168M194.282 1.21094L1.22168 118.237"
              stroke="#777777"
              stroke-width="2"
            />
          </svg>
          <h2 className={styles.ServerName}>Server name</h2>
          <p className={styles.Members}># members</p>
        </div>
      </div>
      <button className={styles.RandomizeButton}>Randomize!</button>
    </div>
  );
}

export { InterestsWidget };
