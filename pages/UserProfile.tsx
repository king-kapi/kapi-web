import styles from '../styles/UserProfile.module.css';


export default function UserProfile() {
    return (
        <div>
            <h1 className={styles.UserProfileContainer}></h1>
                <h1 className={styles.profilePicture}></h1>
                <h1 className={styles.header1}>WowPlayer123</h1>
                <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                
                <div className={styles.header2}>
                    <h2> Personal Interest </h2>
                    <div className={styles.Tags}>
                        <h3 className={styles.Tag}>World of WarCraft</h3>
                        <h3 className={styles.Tag}>League of Legends</h3>
                        <h3 className={styles.Tag}>POC Gamer</h3>
                        <h3 className={styles.Tag}>Non-Binary</h3>
                        <h3 className={styles.Tag}>NA Region</h3>
                        <h3 className={styles.Tag}>PST - Time Zone</h3>
                    </div>
                </div>
                <h2 className={styles.header3}>Top Badges</h2>
                <div className={styles.badgeContainer}></div>
                <h3 className={styles.badgeImage}></h3>
                <h3 className={styles.badgeImage2}></h3>
                <h3 className={styles.badgeImage3}></h3>
                <h3 className={styles.badgeImage4}></h3>
                <h4 className={styles.badgeNames}>50 Lobbies Joined</h4>
                <h4 className={styles.badgeNames2}>Support God Top .3% Support in all games</h4>
                <h4 className={styles.badgeNames3}>Friendly Buddy Top 10% Buddy who Joins Lobbies</h4>
                <h4 className={styles.badgeNames4}>50 Lobbies Joined</h4>
                <div className={styles.line}></div>
        </div>
    );
  }

  export { UserProfile };
  