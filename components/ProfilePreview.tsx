import styles from '../styles/ProfilePreview.module.css';
import ProfileCard from './ProfileCard';

function ProfilePreview() {
  return (
    <div className={styles.ProfilePreviewContainer}>
      <div className={styles.TitleContainer}>
        <h1>Here are some buddies you can meet </h1>
        <button className={styles.Reroll}>
          Reroll
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            className={styles.Vector}
          >
            <path
              d="M9.51561 31.8176C3.72291 25.5893 3.82535 15.8268 9.8434 9.765C12.202 7.37893 15.2688 5.81942 18.5862 5.31915L18.4095 0C13.7524 0.562337 9.42263 2.68442 6.12501 6.02085C-1.93918 14.1391 -2.03649 27.2488 5.81002 35.5515L1.35154 40.0383L15.462 40.8091L15.4235 25.8684L9.51561 31.8176ZM26.5377 1.19085L26.5762 16.1316L32.4841 10.185C38.2768 16.4184 38.1743 26.1809 32.1563 32.2376C29.7982 34.6242 26.7311 36.1838 23.4135 36.6834L23.5902 42C28.2473 41.437 32.5774 39.3161 35.8772 35.9817C43.9389 27.8583 44.0362 14.7487 36.1897 6.4511L40.6482 1.95915L26.5377 1.19085Z"
              fill="black"
            />
          </svg>
        </button>
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
