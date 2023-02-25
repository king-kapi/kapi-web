import styles from '../styles/SignInPage.module.css'
import { Icon } from '@iconify/react'

export default function SignInPage() {
    return (
        <div className={styles.SignInPage}>
            <style>{`body {
                margin: 0;
            }`}</style>
            <div className={styles.Logo}></div>
            <div className={styles.SignInContainer}>
                <div className={styles.SignInHeader}>
                    <h1>Welcome</h1>
                    <h3>Discover safe and inclusive gaming communities for you</h3>
                </div>
                <div className={styles.SignInButtons}>
                    <button type='submit'>
                        <Icon icon='logos:google-icon'/>
                        Sign in with Google
                    </button>
                    <button type='submit'>
                        <Icon icon='logos:discord-icon'/>
                        Sign in with Discord
                    </button>
                </div>
                <div className={styles.SignInDivider}>
                    <div className={styles.Line}><span>or</span></div>
                </div>
                <a className={styles.CreateAccount}>Create an Account</a>
            </div>
        </div>
    )
}