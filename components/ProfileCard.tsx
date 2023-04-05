import styles from '../styles/ProfileCard.module.css'

export default function ProfileCard() {
    return (
        <div className={styles.ProfileCardContainer}>
            <div className={styles.Avatar}></div>
            <h1 className={styles.Username}>WoWPlayer123</h1>
            <div className={styles.Tags}>
                    <h3 className={styles.Tag}>World of WarCraft</h3>
                    <h3 className={styles.Tag}>League of Legends</h3>
                    <h3 className={styles.Tag}>POC Gamer</h3>
                    <h3 className={styles.Tag}>Non-Binary</h3>
                    <h3 className={styles.Tag}>NA Region</h3>
                    <h3 className={styles.Tag}>PST - Time Zone</h3>
            </div>
            <button className={styles.Button}>View Profile</button>
        </div>
    )
}