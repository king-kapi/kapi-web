import { Icon } from '@iconify/react';
import { signIn } from 'next-auth/react';
import styles from '../styles/SignInPage.module.css';

export default function SignInPage() {
    // console.log(providers)

    return (
        <div className={styles.SignInPage}>
            <div className={styles.Logo}></div>
            <div className={styles.SignInContainer}>
                <div className={styles.SignInHeader}>
                    <h1>Welcome</h1>
                    <h3>Discover safe and inclusive gaming communities for you</h3>
                </div>
                <div className={styles.SignInButtons}>
                    <button onClick={() => signIn('google', { callbackUrl: '/' })}>
                        <Icon icon='logos:google-icon' />
                        Sign in with Google
                    </button>
                    <button onClick={() => signIn('discord', { callbackUrl: '/' })}>
                        <Icon icon='logos:discord-icon' />
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