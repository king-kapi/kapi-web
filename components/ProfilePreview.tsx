import styles from '../styles/ProfilePreview.module.css';


function ProfilePreview() {
  return (
    <div className={styles.ProfilePreviewContainer}>
      <div className={styles.TitleContainer}>
        <h1>Here are some buddies you can meet </h1>
      </div>

      <div className={styles.ServersContainer}>
        <div className={styles.profileBox}>
          <div className={styles.ProfilePicture}></div>
          <h2 className={styles.UserName}>WoWPlayer123</h2>
          <p className={styles.DisplayIcon}>League of legends</p>
        </div>


        <div className={styles.profileBox}>
        <div className={styles.ProfilePicture}></div>
          <h2 className={styles.UserName}>WoWPlayer123</h2>
          <div className={styles.DisplayIcon}>League of Legends</div>
        </div>

        <div className={styles.profileBox}>
        <div className={styles.ProfilePicture}></div>
          <h2 className={styles.UserName}>WoWPlayer123</h2>
          <p className={styles.DisplayIcon}>League of legends</p>
        </div>

        </div>
      </div>
  );
}

export { ProfilePreview };
