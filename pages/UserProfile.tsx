import styles from '../styles/UserProfile.module.css';


export default function UserProfile() {
    return (
        <div>
            <h1 className={styles.UserProfileContainer}></h1>
                <h1 className={styles.profilePicture}></h1>
                <h1 className={styles.header1}>WowPlayer123</h1>
                <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                
                <div className={styles.header2}>
                    <h3> Personal Interest </h3>
                    <div className={styles.Tags}>
                        <h3 className={styles.Tag}>World of WarCraft</h3>
                        <h3 className={styles.Tag}>League of Legends</h3>
                        <h3 className={styles.Tag}>POC Gamer</h3>
                        <h3 className={styles.Tag}>Non-Binary</h3>
                        <h3 className={styles.Tag}>NA Region</h3>
                        <h3 className={styles.Tag}>PST - Time Zone</h3>
                    </div>
                </div>
                <h3 className={styles.header3}>Top Badges</h3>
                <div className={styles.badgeContainer}></div>
                <div className={styles.badgeImage} style={{top: 666 , left: 1047}}></div>
                <div className={styles.badgeImage} style={{top: 666, left: 1317}} ></div>
                <div className={styles.badgeImage} style={{top: 782, left: 1047}}></div>
                <div className={styles.badgeImage} style={{top: 782, left: 1317}}></div>
                <h4 className={styles.badgeNames} style={{top: 683 , left: 1156}}>50 Lobbies Joined</h4>
                <h4 className={styles.badgeNames} style={{top: 683 , left: 1421}}>Support God Top .3% Support in all games</h4>
                <h4 className={styles.badgeNames} style={{top: 793 , left: 1421}}>Friendly Buddy Top 10% Buddy who Joins Lobbies</h4>
                <h4 className={styles.badgeNames} style={{top: 799 , left: 1156}}>50 Lobbies Joined</h4>
                <div className={styles.line}></div>
                <h1 className={styles.h4}>Communities</h1>
                <div className={styles.communities} style={{top: 1025, left: 461}}></div>
                <div className={styles.communities} style={{top: 1028, left: 871}}></div>
                <div className={styles.communities} style={{top: 1028, left: 1257}}></div>

                <h4 className={styles.socialHeader}>Social Link</h4>
                <div className={styles.socialBadge} style={{top: 1362, left: 456}}></div>
                <div className={styles.socialBadge} style={{top: 1362, left: 607}}></div>
                <div className={styles.socialBadge} style={{top: 1362, left: 744}}></div>
                
                <div className={styles.requestButton}>
                    <h4 className={styles.request}>Send Request</h4>
                </div>
        </div>
    );
  }
  export { UserProfile };
  