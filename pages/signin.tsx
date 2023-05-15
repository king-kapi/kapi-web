import Icon, {Icons} from '@/components/Icon';
import { signIn } from 'next-auth/react';
import styles from '../styles/SignInPage.module.css';
import EmptyLayout from '@/components/layouts/EmptyLayout';
import Button from '@/components/Button';

export default function SignInPage() {
    // console.log(providers)

    return (
        <div className={styles.SignInPage}>
            <div className={styles.Logo}></div>
            <div className={[styles.SignInContainer, 'bg-black'].join(' ')}>
                <div className={styles.SignInHeader}>
                    <h1>Welcome</h1>
                    <h3>Discover safe and inclusive gaming communities for you</h3>
                </div>
                <div className={styles.SignInButtons}>
                    <Button className={styles.Button} type='secondary' onClick={async () => {
                        console.log(signIn('google', { callbackUrl: '/' }))
                    }}>
                        <Icon icon={Icons['GOOGLE_ICON']} />
                        Sign in with Google
                    </Button>
                    <Button className={styles.Button} onClick={() => signIn('discord', { callbackUrl: '/' })}>
                        <Icon icon={Icons["DISCORD_ICON"]} />
                        Sign in with Discord
                    </Button>
                </div>
                <div className={styles.SignInDivider}>
                    <div className={styles.Line}><span className='bg-black'>or</span></div>
                </div>
                <Button type='secondary' className={styles.CreateAccount}>Create an Account</Button>
            </div>
        </div>
    )
}

SignInPage.getLayout = EmptyLayout.getLayout
