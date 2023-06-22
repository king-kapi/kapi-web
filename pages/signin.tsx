import { signIn } from "next-auth/react";
import styles from "../styles/SignInPage.module.css";
import EmptyLayout from "@/components/layouts/EmptyLayout";
import Button from "@/components/Button";
import Icon from "@/components/icons/Icon";
import Link from "next/link";
import Image from "next/image";
import rainbowKapi from "@/assets/images/rainbow_kapi.png";

export default function SignInPage() {
  // console.log(providers)

  return (
    <div className={styles.SignInPage}>
      <div className={styles.Logo}>
        <Image src={rainbowKapi} alt={"Kapi"}/>
      </div>
      <div className={[styles.SignInContainer, "bg-black"].join(" ")}>
        <div className={styles.SignInHeader}>
          <h1>Welcome</h1>
          <h3>Discover safe and inclusive gaming communities for you</h3>
        </div>
        <div className={styles.SignInButtons}>
          <Button className={styles.Button} buttonType="secondary" onClick={async () => {
            console.log(signIn("google", { callbackUrl: "/" }));
          }}>
            <Icon icon={"google_icon"} />
            Sign in with Google
          </Button>
          <Button className={styles.Button} onClick={() => signIn("discord", { callbackUrl: "/" })}>
            <Icon icon={"discord_icon"} />
            Sign in with Discord
          </Button>
        </div>
        <div className={styles.SignInDivider}>
          <div className={styles.Line}><span className="bg-black">or</span></div>
        </div>
        <Link href={"/Onboarding"}>
          <Button buttonType="secondary" className={styles.CreateAccount}>Create an Account</Button>
        </Link>
      </div>
    </div>
  );
}

SignInPage.getLayout = EmptyLayout.getLayout;