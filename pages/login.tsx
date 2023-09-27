import {signIn} from "next-auth/react";
import styles from "@/src/styles/SignInPage.module.css";
import EmptyLayout from "@/src/components/layouts/EmptyLayout";
import Button from "@/src/components/Button";
import Icon from "@/src/components/icons/Icon";
import Image from "next/image";
import rainbowKapi from "@/assets/images/rainbow_kapi.png";
import Input from "@/src/components/Input";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";

const GOOGLE_ID = process.env.NEXT_PUBLIC_GOOGLE_ID;
const DISCORD_ID = process.env.NEXT_PUBLIC_DISCORD_ID;
const HOST = process.env.NEXT_PUBLIC_HOST;

export default function SignInPage() {
  const searchParams = useSearchParams();

  function emailSignin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if ((formData.get("email") || "").length === 0)
      return alert('Please enter an email!');
    signIn("credentials", {
      callbackUrl: "/",
      email: formData.get("email")
    })
  }

  useEffect(() => {
    console.log(searchParams.get("code"));
  }, [searchParams]);

  const handleGoogleRedirect = () => {
    location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_ID}&scope=email&redirect_uri=${HOST}/login/google&prompt=consent`;
  }

  const handleDiscordRedirect = () => {
    location.href = `https://discord.com/oauth2/authorize?response_type=code&client_id=${DISCORD_ID}&scope=email&redirect_uri=${HOST}/login/discord&prompt=consent`;
  }

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
          <Button className={styles.Button} buttonType="secondary" onClick={handleGoogleRedirect}>
            <Icon icon={"google_icon"}/>
            Sign in with Google
          </Button>
          <Button className={styles.Button} onClick={handleDiscordRedirect}>
            <Icon icon={"discord_icon"}/>
            Sign in with Discord
          </Button>
          {process.env.NODE_ENV === "development" ?
            <form className={"flex mt-8 gap-x-4"} onSubmit={emailSignin}>
              <Input className={"flex-grow"} name={"email"}/>
              <Button type={"submit"}>Email</Button>
            </form> : <></>
          }
        </div>
      </div>
    </div>
  );
}

SignInPage.getLayout = EmptyLayout.getLayout;